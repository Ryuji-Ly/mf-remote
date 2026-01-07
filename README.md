# Dummy Remote - Module Federation Counter

A simple Module Federation remote that exposes a counter component with an incrementing button.

## Features

- Simple counter component that increments on button click
- Exposed via Module Federation as `dummyRemote/Counter`
- Standalone application that can run independently
- Styled with CSS for a modern look

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

Run the development server on port 4003:

```bash
npm start
```

The application will be available at `http://localhost:4003`

### Build

Build for production:

```bash
npm run build
```

## Module Federation

This remote exposes the following modules:

- `./Counter` - A React component with an incrementing counter button

### Usage in Host Application

To consume this remote in a host application, add it to your Module Federation configuration:

```javascript
new ModuleFederationPlugin({
    name: "host",
    remotes: {
        dummyRemote: "dummyRemote@http://localhost:4003/remoteEntry.js",
    },
    // ... other config
})
```

Then import and use the Counter component:

```typescript
const Counter = React.lazy(() => import("dummyRemote/Counter"));

// In your component:
<Counter />
```
