#!/bin/bash

domains=(mf-remote.duckdns.org)
rsa_key_size=4096
data_path="./certbot"
email="" # Adding a valid email address is strongly recommended
staging=0 # Set to 1 if you're testing your setup to avoid hitting request limits

if [ -d "$data_path" ]; then
  read -p "Existing data found for $domains. Continue and replace existing certificate? (y/N) " decision
  if [ "$decision" != "Y" ] && [ "$decision" != "y" ]; then
    exit
  fi
fi

if [ ! -e "$data_path/conf/options-ssl-nginx.conf" ] || [ ! -e "$data_path/conf/ssl-dhparams.pem" ]; then
  echo "### Downloading recommended TLS parameters ..."
  mkdir -p "$data_path/conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "$data_path/conf/options-ssl-nginx.conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "$data_path/conf/ssl-dhparams.pem"
  echo
fi

echo "### Starting nginx with HTTP-only config ..."
# Temporarily use HTTP-only config
mv nginx/conf.d/app.conf nginx/conf.d/app.conf.ssl
cp nginx/conf.d/app-http-only.conf nginx/conf.d/app.conf
docker-compose up -d nginx
echo

echo "### Requesting Let's Encrypt certificate for $domains ..."
domain_args=""
for domain in "${domains[@]}"; do
  domain_args="$domain_args -d $domain"
done

# Select appropriate email arg
case "$email" in
  "") email_arg="--register-unsafely-without-email" ;;
  *) email_arg="--email $email" ;;
esac

# Enable staging mode if needed
if [ $staging != "0" ]; then staging_arg="--staging"; fi

docker-compose run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    $staging_arg \
    $email_arg \
    $domain_args \
    --rsa-key-size $rsa_key_size \
    --agree-tos \
    --force-renewal" certbot

if [ $? -eq 0 ]; then
  echo
  echo "### Certificate obtained successfully! Switching to HTTPS config ..."
  # Restore SSL config
  mv nginx/conf.d/app.conf.ssl nginx/conf.d/app.conf
  
  echo "### Reloading nginx with HTTPS ..."
  docker-compose restart nginx
  echo
  echo "### Success! Your site is now available at https://$domains"
else
  echo
  echo "### Certificate request failed. Restoring original config..."
  mv nginx/conf.d/app.conf.ssl nginx/conf.d/app.conf
  docker-compose restart nginx
fi
