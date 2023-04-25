# Gladia

## Run the project

To run this project, first, install [Node 18+](https://nodejs.org/) and [pnpm](https://pnpm.io/fr/installation).

Install the dependencies:

```sh
pnpm i
```

Add a `.env` file at the root of the project and add your Gladia api key (get one [here](https://app.gladia.io/account)):

```
GLADIA_API_TOKEN=<your gladia api token>
```

You are now ready to run the project.  
To run it in development mode, execute the following command:

```sh
pnpm dev
```

Or to run it in production mode:

```sh
pnpm serve
```

The app will be available at http://localhost:3000.  
API documentation is available at http://localhost:3300/doc.

A default user is available : `john.doe@gmail.com` / `azerty`.  
Feel free to use it or create another one with the sign-up form.

You can find audio and video samples inside folder `/samples`.

## Other commands

To run the tests:

```sh
pnpm test
```

To run eslint:

```sh
pnpm lint
```

To run the ts check:

```sh
pnpm tscheck
```

To run the E2E tests:

```sh
pnpm test:e2e
```

## Librairies used

The project is a monorepo using [Nx](https://nx.dev/).

For the UI app, it's [Remix](https://remix.run/) to easily handle cookie and redirection.

For the API, it's [NestJS](https://nestjs.com/).  
[Prisma](https://www.prisma.io/) and [SQLite](https://sqlite.org/index.html) are used for the database part.

[Zod](https://zod.dev/) is used to validate inputs/outputs.

A SDK for the API is generated with the help of [openapi-typescript-codegen](https://github.com/ferdikoomen/openapi-typescript-codegen).

[Playwright](https://playwright.dev/) is used to run the end-to-end tests.
