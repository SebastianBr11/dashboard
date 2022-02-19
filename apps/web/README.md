# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Development

From the root of the project:

```sh
pnpm dev
```

This starts the remix app and the other packages in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
pnpm build
```

Then run the app in production mode:

```sh
pnpm start
```

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`
