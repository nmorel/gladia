# Gladia

To run this project, first, install [Node 18+](https://nodejs.org/) and [pnpm](https://pnpm.io/fr/installation).

Add a `.env` file at the root of the project and add your Gladia api key (get one [here](https://app.gladia.io/account)):

```
GLADIA_API_TOKEN=<your gladia api token>
```

Then execute the following commands:

```sh
pnpm i
pnpm build
pnpm dev
```

The app will then be available at http://localhost:3000.  
API documentation is available at http://localhost:3300/doc.

You can find audio and video samples inside folder `/samples`.
