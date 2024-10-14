<div align="center">

# `Nextra` _Demo_

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/dwyl/nextra-demo/ci.yml?label=build&style=flat-square&branch=main)
[![codecov.io](https://img.shields.io/codecov/c/github/dwyl/nextra-demo/main.svg?style=flat-square)](https://codecov.io/github/dwyl/nextra-demo?branch=main)
[![HitCount](https://hits.dwyl.com/dwyl/nextra-demo.svg?style=flat-square)](https://hits.dwyl.com/dwyl/nextra-demo)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](https://github.com/dwyl/nextra-demo/issues)

A comprehensive demo / tutorial
using `Nextra` for a documentation site <br />
with
**authentication**
(private pages),
search and analytics!

</div>

<!--
Note: the Table of Contents is auto-generated/updated by Markdown All-in-One 
https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one
-->

- [`Nextra` _Demo_](#nextra-demo)
- [Why? 🤷‍♀️](#why-️)
- [What? ✨](#what-)
- [Who? 👥](#who-)
- [How? 👩‍💻](#how-)
  - [Run the _Finished_ Project](#run-the-finished-project)
    - [1. Clone the Project](#1-clone-the-project)
    - [2. Install Dependencies](#2-install-dependencies)
    - [3. Create Environment Variables](#3-create-environment-variables)
    - [4. Run the App!](#4-run-the-app)
  - [Run the Tests!](#run-the-tests)
  - [Build It!](#build-it)
- [_Please_ star the repo! ⭐️](#please-star-the-repo-️)
- [Troubleshooting](#troubleshooting)
  - [I'm getting an error pertaining a missing secret](#im-getting-an-error-pertaining-a-missing-secret)


# Why? 🤷‍♀️

Working as a software engineer,
you come across technical documentation daily.
From API references to internal manuals,
technical documentation
**is vital for the development process**.
Everyone expects docs as a
[hygiene factor](https://en.wikipedia.org/wiki/Two-factor_theory#:~:text=Hygiene%20factors).
Without docs,
knowledge of the application becomes siloed
and means you cannot scale your team
or continue in the event of someone leaving!

Great docs ensure long-term sustainability of your software projects.
Having a clear record
of the `why`, `how` and `what`
helps maintain consistency
and increases the quality of your work!

Whether it is meant as an internal reference
or you're creating documentation for public-facing clients
that are using your project,
having documentation benefits both the developers and users alike.


# What? ✨

[`Nextra`](https://nextra.site/) is a framework
that makes it easy for you to create a documentation static website
fully optimized and powered by 
[`Next.js`](https://github.com/dwyl/learn-nextjs).

It simpifies the process of creating and maintaining documentation
by offering a myriad of features, such as:
- Themeable design system.
- Markdown and [`MDX`](https://nextra.site/docs/guide/markdown) support.
- Full-text search out-of-the-box.
- Automatic [`a11y`](https://www.a11yproject.com/).
- Filesystem-based organization.

The integration with
[`Next.js`](https://github.com/dwyl/learn-nextjs)
makes `Nextra` fully customizable,
thus ideal for your team
to quickly generate a website
that is useful for both internal and external stakeholders.

# Who? 👥

This walkthrough is meant for beginners
and seasoned software engineers alike
who want to create internal and external
documentation for their teams.

This will **not be an introduction to technical writing**,
it will solely focus on the `Nextra` framework.
We recommend visiting 
[developers.google.com/tech-writing](https://developers.google.com/tech-writing/overview)
if you are interested in learning more about technical writing.

If you find it useful, please give the repo a star! ⭐️

If you get stuck, have questions/suggestions
or just want to discuss this further,
[please open an issue](https://github.com/dwyl/nextra-demo/issues)!

# How? 👩‍💻 

Ready? Let's go! 🚀

> [!IMPORTANT]
>
> The project at root-level pertains to the `v3` version of `Nextra`.
> To find the `v2` version,
> check th [`_v2`](./_v2) directory.

## Run the _Finished_ Project

### 1. Clone the Project

In your terminal, 
run the following command to clone the repo:

```sh
git clone git@github.com:dwyl/nextra-demo.git && cd nextra-demo
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


## Run the Tests!

Run the tests with the following command:

```sh
npm run test
```

Alternatively, you can run end-to-end tests
(which use [Playwright](https://playwright.dev/))
by running the following command:

```sh
npm run e2e:test
```

## Build It!

Ready to _build_ it yourself?!
See:
[docs/tutorial.md](./docs/tutorial.md)


# _Please_ star the repo! ⭐️

If you find this repo/tutorial useful,
please star it on GitHub, so that we know! ⭐

Thank you! 🙏


# Troubleshooting

## I'm getting an error pertaining a missing secret

You may have encountered the following error.

```sh
[auth][error] MissingSecret: Please define a `secret`.. 
  Read more at https://errors.authjs.dev#missingsecret
```

It means that you're missing a secret
from `auth.js`.
Visit https://authjs.dev/reference/core/errors#missingsecret
and create a secret and place it in the `.env` file locally
and you should be good to go!
