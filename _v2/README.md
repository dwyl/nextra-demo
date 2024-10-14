<div align="center">

# `Nextra` Demo `v2`

The demo in this folder pertains to the `v2` version of `Nextra`.
Check how to run it below!

</div>

<!--
Note: the Table of Contents is auto-generated/updated by Markdown All-in-One 
https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one
-->

- [`Nextra` Demo `v2`](#nextra-demo-v2)
  - [Run the project](#run-the-project)
    - [1. Clone the Project](#1-clone-the-project)
    - [2. Install Dependencies](#2-install-dependencies)
    - [3. Create Environment Variables](#3-create-environment-variables)
    - [4. Run the App!](#4-run-the-app)
  - [Build It!](#build-it)

## Run the project

### 1. Clone the Project

In your terminal, 
run the following command to clone the repo:

```sh
git clone git@github.com:dwyl/nextra-demo.git && cd nextra-demo/_v2
```

### 2. Install Dependencies

Run:

```sh
npm i
```

### 3. Create Environment Variables

Copy the `.env.local-example` file and create your `.env.local` file:

```sh
cp .env.local-example .env.local
```

Add the necessary environment variables to your `.env.local` file,
e.g: 

```sh
AUTH_SECRET=<YOUR_GENERATED_SECRET>

AUTH_GITHUB_ID=<GITHUB_OAUTH_APPLICATION_ID>
AUTH_GITHUB_SECRET=<GITHUB_OAUTH_APPLICATION_SECRET>

TEST_PASSWORD=<ANY_PASSWORD_FOR_TESTS_TO_RUN>
```

> [!NOTE]
>
> Check [docs/tutorial.md](./docs/tutorial.md#2-add-authentication-)
> to learn where to get these environment variables.


### 4. Run the App!

Open your web browser in http://localhost:3000
and run in dev mode by typing this in the terminal.

```sh
npm run dev
```

If you wish to run in production mode,
make sure to run the `build` script first and then start.

```sh
npm run build
npm start
```

## Build It!

Ready to _build_ it yourself?!
See:
[tutorial.md](./tutorial.md)