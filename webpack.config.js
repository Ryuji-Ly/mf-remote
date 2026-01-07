const HtmlWebpackPlugin = require("html-webpack-plugin");
const { container } = require("webpack");
const { ModuleFederationPlugin } = container;

module.exports = (env = {}) => {
    return {
        mode: env.dev ? "development" : "production",
        entry: "./src/index.ts",
        devtool: env.dev ? "inline-source-map" : false,
        devServer: {
            port: 4003,
            headers: { "Access-Control-Allow-Origin": "*" },
        },
        output: {
            publicPath: "auto",
            clean: true,
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
            ],
        },
        plugins: [
            new ModuleFederationPlugin({
                name: "dummyRemote",
                filename: "remoteEntry.js",
                exposes: {
                    "./App": "./src/Counter",
                },
                shared: {
                    react: {
                        singleton: true,
                        requiredVersion: false,
                        strictVersion: false,
                        eager: false,
                    },
                    "react-dom": {
                        singleton: true,
                        requiredVersion: false,
                        strictVersion: false,
                        eager: false,
                    },
                },
            }),
            new HtmlWebpackPlugin({ template: "./public/index.html" }),
        ],
    };
};
