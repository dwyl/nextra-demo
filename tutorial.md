<div align="center">

# `Nextra` _Tutorial_

</div>

> [!TIP]
>
> Some of the info in these notes
> can also be found in the
> official `Nextra` docs: 
> [nextra.site/docs](https://nextra.site/docs)
> <br />
> We recommend going through the docs
> if you get stuck
> or want a more in-depth understanding of the framework.

When using `Nextra`,
you _first_ have to choose: <br />
_either_ use a **`default` theme**
***or*** **_customize_ your own**.

The vast majority of people will use the **`default` theme**.
However, if you need a _specific_ look & feel,
you may have to create your own theme.
We learned the hard way that it's _much_ easier
to start with a custom theme
than using a `default` one and attempt to change it afterwards ...
see:
[nextra#2926](https://github.com/shuding/nextra/issues/2926)

For this demo,
we'll start with the
**`default` theme**
and change it as needed.

## 0. Start a new project 🆕

Before creating a project,
first install the dependencies
using
[`pnpm`](https://pnpm.io/):

```sh
pnpm add next react react-dom nextra nextra-theme-docs
```

This will create a `package.json` file
and install the dependencies under `/node_modules`.

Next add the following scripts
to `package.json`
to run the app:

```json
"scripts": {
  "dev": "next",
  "build": "next build",
  "start": "next start"
},
```

Your `package.json` will look similar to:

```json
{
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^14.2.4",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "nextra": "^2.13.4",
    "nextra-theme-docs": "^2.13.4"
  }
}
```

Next, create a `Nextra` config file
called
`next.config.js`
and add the following code to it:

```js
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  defaultShowCopyCode: true
})
 
module.exports = withNextra()
```

This defines the global configuration for the project.
e.g:
`defaultShowCopyCode: true`,
which will add a `copy` button to code snippets.

Lastly, we need to create
a corresponding
`theme.config.jsx`
file in project root directory.
It is used to configure the `Nextra` site theme.
Add the following code to it:

```js
import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
    logo: <span>Nextra Docs</span>,
    project: {
      link: 'https://github.com/shuding/nextra'
    }
  }

export default config
```

Save the file and continue.

> [!TIP]
>
> Full theme config docs:
> [nextra.site/docs/docs-theme](https://nextra.site/docs/docs-theme/theme-configuration).

Given that
`Nextra` is a **file-based system framework**
(based on `Next.js`),
we create docs
under the `/pages` directory.
Create a file with the path
`pages/index.mdx`
and type/paste the following markdown:

```mdx
# Welcome to our docs!
 
Hello, world!
```

> [!NOTE]
>
> [`mdx`](https://mdxjs.com/)
> files are markdown files
> that allow you to write
> `JSX`
> markup.
> Meaning you can import components
> and embed them within your markdown files.

Let's see the first page;
Run:

```sh
pnpm run dev
```

and visit
[localhost:3000](http://localhost:3000/)
in your web browser
You should see your page!

<p align="center">
  <img width='800' src="https://github.com/dwyl/learn-nextjs/assets/17494745/532ac0ca-312b-44cf-ac9a-a8801888ae55"/>
</p>

Congrats!
You've just set up your docs site!

## 1. Organize Your Content

Now let's write some content!
We are going to organize our documentation
so it's easier to navigate.

In `Nextra`,
the site and page structure can be configured via
[`_meta.json`](https://nextra.site/docs/guide/organize-files)
files.
These files will affect the layout of the theme,
especially the sidebar/navigation bar.

For example, the title and order of a page shown in the sidebar
should be configured in the `_meta.json` file as key-value pairs.
Create the following structure in your project.

```sh
pages
|_ api_reference
    |_ _meta.json
    |_ about.mdx
|_ _meta.json
|_ about.mdx
|_ contact.mdx
|_ index.mdx
```

Define the pages `_meta.json`:

```json
{
  "index": "My Homepage",
  "contact": "Contact Us",
  "api_reference": "API Reference",
  "about": "About Us"
}
```

And in the nested `_meta.json` file,
inside `api_reference`.

```json
{
  "about": "about"
}
```

As you can see, you can group pages together in directories
**to create _a hierarchy_** of pages,
thus organizing them neatly.

If you want a directory to have its own page,
you can simply add an `index.mdx` file.
Let's say we want `api_reference` to have an introductory page
when we click on it on the sidebar.
Simply create the `index.mdx` file:

```sh
pages
|_ api_reference
    |_ _meta.json
    |_ about.mdx
    |_ index.mdx   // added this
|_ _meta.json
|_ about.mdx
|_ contact.mdx
|_ index.mdx
```

Fill each `.mdx` file with content
then run:
`pnpm run dev`
to see your pages organized!

<div align="center">
  <img width='800' src="https://github.com/dwyl/learn-nextjs/assets/17494745/a1122331-3416-4232-b412-272cae84d9d6"/>
</div>

### 1.1 External Links and Hidden Routes

You can further customize the `_meta.json` 
to show external links
and hide some routes.

In the top-level `_meta.json`,
change it to the following.

```json
{
  "index": "My Homepage",
  "contact": "Contact Us",
  "api_reference": "API Reference",
  "about": "About Us",
  "github_link": {
    "title": "Github",
    "href": "https://github.com/shuding/nextra",
    "newWindow": true
  }
}
```

This will add a new link to the sidebar that,
once clicked,
will redirect the person to the `Github` page.

You can also hide it.
Simply add the `display` property and set it to `hidden`,
just like in `CSS`!

```json
{
  "index": "My Homepage",
  "contact": "Contact Us",
  "api_reference": "API Reference",
  "about": "About Us",
  "github_link": {
    "title": "Github",
    "href": "https://github.com/shuding/nextra",
    "newWindow": true,
    "display": "hidden"
  }
}
```

### 1.2 Adding items to the navbar

The navbar is a great way to further organize your content.
You can show special pages on the navigation bar 
instead of the sidebar.
To do this, you need to use the `"type": "page"` property
in the `_meta.json` file at top level.

Let's add the `API Reference` to the navbar.
To do this, edit the top-level `_meta.json` to look like so:

```json
{
  "index": {
    "title": "Homepage",
    "type": "page",
    "display": "hidden"
  },
  "api_reference": {
    "title": "API Reference",
    "type": "page"
  },
  "about": {
    "title": "About Us",
    "type": "page"
  },
  "contact": {
    "title": "Contact Us",
    "type": "page"
  },
  "github_link": {
    "title": "Github",
    "href": "https://github.com/shuding/nextra",
    "newWindow": true,
    "display": "hidden"
  }
}
```

This will make every single top-level file
a page on the navbar.
We've hidden the `index.mdx`,
because it's rendered by default when we enter the site
and we can return to it if we click on the website's logo.
Inside `api_reference`,
create a new file called `users.mdx` 
and write whatever you want in it.
Let's change the `_meta.json` file inside this directory
to the following.

```json
{
  "about": "about",
  "---": {
    "type": "separator"
  },
  "users": "users"
}
```

Notice that we've added `"---"`. 
This will add a separator between the two sidebar items.

If you run `pnpm run dev`, 
you will see that your site is organized differently.
The top-level pages are in the navbar,
and you can check the sidebar inside the `api_reference` folder contents.

<p align="center">
  <img width='800' src="https://github.com/dwyl/learn-nextjs/assets/17494745/ce73b6d9-6890-4ee4-9635-354f88cbe887"/>
</p>

Awesome! 🎉

There are the basics on how to organize your content
inside your website!


## 2. Add Authentication

Now that our website is in working order,
let's work in adding authentication to it!
This is important because
you may want to use this website
*for internal purposes*,
meaning that **it can't be public-facing**.

To address this issue,
we are going to make the users have to sign in 
through a given provider 
to be able to visit private pages
that we will define ourselves.

Let's rock! 🎸

We are going to be using 
[`Auth.js`](https://authjs.dev/) to streamline our authentication process.
This framework was previously working solely on `Next.js` projects,
but this new `v5` release extends their compatibility to other frameworks.

Let's add it to our project!

> [!NOTE]
>
> At the time of writing, 
> only the `beta` version of `auth.js` is working.
> We'll update this doc when a full stable release is announced.

```sh
pnpm add next-auth@beta
```

Great!
Now let's create our secret. 
We are going to be using this secret as an 
[environment variable](https://github.com/dwyl/learn-environment-variables),
which is used by the library to encrypt token and e-mail verification hashes.
Simply run:

```sh
npx auth secret
```

Your terminal will show this:

```
Need to install the following packages:
auth@1.0.2
Ok to proceed? (y) y

Secret generated. Copy it to your .env/.env.local file (depending on your framework):

AUTH_SECRET=<your_secret>
```

Copy the secret and create a file called `.env.local`.

```sh
AUTH_SECRET=secret
```

Great!
Now let's create the configuration files needed for `Auth.js` to work!
Start by creating a file called `auth.ts` at the root.

```ts
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],
});
```

Then, create the following folders from the root of the project - 
`/app/api/auth/[...nextauth]/`.
`Nextra` only works in the [Pages Router](https://nextjs.org/docs/pages).
Authentication with `Auth.js` needs the 
[App Router](https://nextjs.org/docs/app) to work.
For this, we need to create the folder hierarchy we've just mentioned.

After creating the folders,
create a file called `route.ts` inside `[...nextauth].

```ts
import { handlers } from "@/auth" // Referring to the auth.ts we just created
export const { GET, POST } = handlers
```

And add a file called `middleware.ts` at the root of the project.
This is to keep the session alive, 
this will update the session expiry every time its called.

```ts
export { auth as middleware } from "@/auth"
```

> [!NOTE]
>
> Your imports may be complaining about not being able to find the `@auth` module.
> To fix this, create a `tsconfig.json` file at the root of the project
> with the following code.
> 
> ```json
> {
>  "compilerOptions": {
>    "target": "es5",
>    "lib": ["dom", "dom.iterable", "esnext"],
>    "allowJs": true,
>    "skipLibCheck": true,
>    "strict": true,
>    "noEmit": true,
>    "esModuleInterop": true,
>    "module": "esnext",
>    "moduleResolution": "bundler",
>    "resolveJsonModule": true,
>    "isolatedModules": true,
>    "jsx": "preserve",
>    "incremental": true,
>    "plugins": [
>      {
>        "name": "next"
>      }
>    ],
>    "paths": {
>      "@/*": ["./*"]
>    }
>  },
>  "include": [
>    "next-env.d.ts",
>    "**/*.ts",
>    "**/*.tsx",
>    ".next/types/**/*.ts",
>    "app/lib/placeholder-data.js",
>    "scripts/seed.js"
>  ],
>  "exclude": ["node_modules"]
> }

And that's it!
We're all ready to go!


### 2.1 Adding Github provider

You can now decide how you are going to authenticate the users into your application.
You can either:
- choose an [`OAuth`](https://oauth.net/2/), 
a delegated authentication where you delegate through a third party.
- or you can set up your own [identity provider](https://www.cloudflare.com/en-gb/learning/access-management/what-is-an-identity-provider/)
and take care of it yourself.

We're going to choose the former, because it's easier.
[`Auth.js` docs](https://authjs.dev/getting-started/authentication) explain it succinctly.

> OAuth services spend significant amounts of money, time, and engineering effort to build abuse detection (bot-protection, rate-limiting), 
> password management (password reset, credential stuffing, rotation),
> data security (encryption/salting, strength validation), and much more. 
> It is likely that your application would benefit from leveraging these battle-tested solutions rather than try to rebuild them from scratch.

Let's authenticate our users through a GitHub provider!

Let's add it to our `providers` array inside `auth.ts`

```ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
});

```

Next, create an **`OAuth` app** inside our GitHub account.
Navigate to `https://github.com/settings/developers`
and click on `OAuth Apps`
and click on `New OAuth App`.

<p align="center">
  <img width='800' src="https://github.com/dwyl/learn-nextjs/assets/17494745/bcf20102-d76f-474e-a144-f5623f1e3289"/>
</p>

Fill out the information.
The default callback URL will be of the form of 
`[origin]/api/auth/callback/[provider]`.
While developing, you may use `localhost` as the `origin`.
However, you'll have to chance this to your product's domain in production.

```sh
// Local
http://localhost:3000/api/auth/callback/github
 
// Prod
https://app.company.com/api/auth/callback/github
```

<p align="center">
  <img width='800' src="https://github.com/dwyl/learn-nextjs/assets/17494745/b57b4adf-a1bb-4ecc-bdd5-00725e84f99f"/>
</p>

After completing the form,
you will be redirected to the page of your newly created `OAuth` app.
Click on `Generate a new client secret`.

<p align="center">
  <img width='800' src="https://github.com/dwyl/learn-nextjs/assets/17494745/dab08580-337a-4ca7-b8d5-9f0c73b91862"/>
</p>

You will be shown the secret of the new app.
Do not close the page, you will need to copy this `secret` and the shown `client ID.`

<p align="center">
  <img width='800' src="https://github.com/dwyl/learn-nextjs/assets/17494745/1b690614-cba3-4187-8448-72dc9e9fd62c"/>
</p>

In your `.env.local` file,
add these two copied strings, like so.

```sh
AUTH_SECRET=

AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
```

And that's all the configuration we need!
Now it's time to authenticate people into our app!


### 2.2 Letting people `Sign In` and `Sign Out`

With all the configuration out of the way,
it's time to a way for people to **sign in** and **sign out** of our Nextra website.

Before continuing, 
let's change our site's structure a little bit.
Make it like so.

```
pages
|_ reference_api          // yes, change from 'api_reference' to 'reference_api'
    |_ mega_private       // add this new folder
      |_ _meta.json
      |_ hello.mdx
    |_ _meta.json
    |_ about.mdx
    |_ mega_private.mdx  // This is the index page of `mega_private` that will show on the sidebar. Write whatever.
    |_ users.mdx
|_ _meta.json
|_ about.mdx
|_ api_reference.mdx
|_ contact.mdx
|_ index.mdx
```

> [!IMPORTANT]
>
> Change the root `_meta.json` file pertaining to `"api_reference"`
> to `"reference_api"`, and the folder as well.
>
> This is important because we are going to have a middleware
> that is going to match routes to perform authorization checks.
> `Next.js` projects usually have APIs under `/api`,
> which means the middleware was not going to perform verifications on anything
> under `api`.

Create a new folder `mega_private` inside `api_reference`.
We'll use this later.
You can write whatever you want in it.
Keep the `_meta.json` inside `mega_private` simple, like so.

```json
{
    "hello": "Hello page"    
}
```

Great!

`next-auth` provides a set of built-in pages
for people to go through their authentication journey
(sign in, sign up, sign out, error, etc...).
[Although you can customize your own pages](https://authjs.dev/guides/pages/signin),
we are going to leverage these built-in pages
to keep the tutorial simple.

To allow people to sign in,
let's create a component to be shown in `pages/index.mdx`,
the root page of the site.

For this, create a folder called `components` on the root of the project.
Inside of `components`, create `LoginOrUserInfo`,
and inside this one create a file called `index.ts` (`components/LoginOrUserInfo/index.tsx`).

```ts
import { signOut, signIn } from "next-auth/react";
import { DefaultSession } from "next-auth";

export function LoginOrUserInfo({ session } : Readonly<{session: DefaultSession}>) {
  if (session?.user) {
    return (
      <div>
        <span>
          Welcome <b>{session.user.name}</b>
        </span>{" "}
        <br />
        <button onClick={() => signOut()}>SIGN OUT</button>
      </div>
    );
  } else {
    return <button onClick={() => signIn()}>SIGN IN</button>;
  }
}
```

We are exporting a function `LoginOrUserInfo` 
that receives `Session` object (from `next-auth`).
Inside this component, what we do is really simple:
show his name and a `SignOut` button if they are logged in;
otherwise, show a button to `SignIn`.

We are leveraging both `signIn` and `signOut` functions from `next-auth`.

> [!WARNING]
>
> By creating these nested folders,
> we have to update the `tsconfig.json` file to encompass
> files that are nested on more than two levels.
>
> ```json
> "include": [
>   "next-env.d.ts",
>   "*/**/*.ts",       // add this line
>   "**/*.ts",
>   "**/*.tsx",
>   ".next/types/**/*.ts",
>   "app/lib/placeholder-data.js",
>   "scripts/seed.js"
> ],
> ```

Now let's use our newly created component.
Go to `pages/index.mdx` and add the following code to the top.

```mdx
import { auth } from "@/auth.ts"
import { useData } from 'nextra/data'
import Link from 'next/link'
import { signOut } from "next-auth/react"
import { LoginOrUserInfo } from "@/components/LoginOrUserInfo"

export async function getServerSideProps(ctx) {
  const session = await auth(ctx)

return {
      props: {
        // We add an `ssg` field to the page props,
        // which will be provided to the Nextra `useData` hook.
        ssg: {
          session
        }
      }
    }
}

export const Info = () => {
  // Get the data from SSG, and render it as a component.
  const { session } = useData()
  return <LoginOrUserInfo session={session}/>
```

We are using [`getServerSideProps` ](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props)
to fetch the session from the `auth` function from `next-auth`.
For more information about this inside `Nextra`,
visit https://nextra.site/docs/guide/ssg.

We need to return the session inside an object `props`
and adding a named property called `ssg`
with the data we want to send over the components we want to display.
`Nextra` retrieves this data using the `useData()` hook.

In the `Info` component, we fetch the `session` object
from the `auth` and pass it to the component 
we've created `<LoginOrUserInfo>`.

All that's left is using this component in our `.mdx` file.
Simply add `<Info/>` (the component we've created inside `.mdx`)
wherever you want in the page1

If you run the application, you should be able to sign in and sign out!

<p align="center">
  <img width='30%' src="https://github.com/dwyl/nextra-demo/assets/17494745/cdbff626-2d2b-4ecf-a100-23765db61bfe"/>
  <img width='30%' src="https://github.com/dwyl/nextra-demo/assets/17494745/62f8dc3e-cc47-477d-88ef-9d916fd8da72"/>
  <img width='30%' src="https://github.com/dwyl/nextra-demo/assets/17494745/a5aeb1c5-a341-4287-942a-564343f1a0b5"/>
</p>

We now have access to [`JWT` tokens](https://jwt.io/introduction) in our application,
where `GitHub`'s `OAuth` provider is providing them for us.

Now let's start using it to start protecting routes!


## 3. Protecting routes

We now have a basic authentication flow in our site,
with `GitHub` providing and managing the tokens for our application for us.
It's in our interest to restrict certain routes to specific users
with specific roles if we ever want to make our awesome documentation site
*available to different clients*.


### 3.1 A word about `middleware.ts`

Normally, when developing applications that follow the normal
`Frontend -> Backend -> Database` convention,
you usually want to have security measures
**as close to the data as possible**.

[With `React Server Components` being introduced in `Next.js`](https://nextjs.org/docs/app/building-your-application/rendering/server-components),
the line between server and client gets blurred.
Data handling is paramount in understanding where information is processed
and subsequently made available.
So we always have to be careful to know
how authentication and how protecting routes is implemented
and *where* it is processed,
so it's not subject to malicious actors.


> [!NOTE]
>
> To learn more about Data Access Layers,
> please visit https://x.com/delba_oliveira/status/1800921612105011284
> and https://nextjs.org/blog/security-nextjs-server-components-actions.
> These links provide great insights on how to implement a Data Access Layer
> to better encapsulate your data and minimize security pitfalls.

For this purpose,
because `Nextra` statically generates pages,
we are going to be using [**`middleware`**](https://nextjs.org/docs/pages/building-your-application/routing/middleware)
to protect the routes.
[`next-auth`](https://authjs.dev/getting-started/session-management/protecting?framework=express#api-routes)
warns people to
**on middleware exclusively for authorization and to always ensure that the session is verified as close to your data fetching as possible.**
While that is true
(and a reiteration of what was aforementioned),
protecting the routes in our application
through `middleware`
is optimistically secure enough
(as it runs on the server-side),
as it runs on every request,
including prefetched routes.
Additionally, [`Next.js` recommends doing so](https://nextjs.org/docs/pages/building-your-application/authentication#protecting-routes-with-middleware).

> "This is important for keeping areas like the user dashboard protected while having other pages like marketing pages be public.
> It's recommended to apply Middleware across all routes and specify exclusions for public access.


### 3.2 Adding `middleware.ts` logic

As per `Next.js`'s convention,
to add this middleware,
we need to create a `middleware.ts` file at the root of the project.

Create it and add the following code to it:

```ts
// middleware.ts

"server only";

import { auth } from "@/auth";
import { NextResponse } from "next/server";

// !!!! DO NOT CHANGE THE NAME OF THE VARIABLE !!!!
const privateRoutesMap: any = {};

export default auth(async (req, ctx) => {
  const currentPath = req.nextUrl.pathname;
  const isProtectedRoute = currentPath in privateRoutesMap

  if(isProtectedRoute) {
    // Check for valid session
    const session = req.auth

    // Redirect unauthed users
    if(!session?.user || !session.user.role) {
      return NextResponse.redirect(new URL('/api/auth/signin', req.nextUrl))
    }

    // Redirect users that don't have the necessary roles
    const neededRolesForPath = privateRoutesMap[currentPath]
    if(!(session.user.role && neededRolesForPath.includes(session.user.role))) {
      return NextResponse.redirect(new URL('/api/auth/signin', req.nextUrl))
    }
  }

  return NextResponse.next()
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

```

Let's break down what we just wrote:

- **`privateRoutesMap`** is an object/map that will have the **path** as `key`
and the **array of roles needed to access the path** as `value`.
This variable will be changed on build-time,
so do not change its name!
- we export **`auth`** as default from `middleware.ts`.
This function is called before every route server-side.
Inside it, we check the path and the session cookie.
With these, we can know *if the route is protected* or not.
If it is, we check if the person can access it with the given role.
If any of these conditions fail,
the person is redirected to the Sign In page.
- we also export a **`config`** object,
with a `matcher` property.
We use [`RegEx`](https://regexr.com/) to configure which paths we want the middleware to run on.

> [!NOTE]
>
> Your `Typescript` compiler may be complaining
> because `role` is not a property inside `user`.
> Don't worry, we'll fix this now.


### 3.3 Configuring `auth.ts`

`middleware.ts` assumes the `JWT` token to have a role
in order to do role-based authorization.
For it to have access to it
(and throughout the whole application),
we ought to head over to `auth.ts`
and do additional configuration.

Open `auth.ts` and change it the following.

```ts
// auth.ts

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      profile(profile) {
        // GitHub's OAuth apps don't allow you to define roles.
        // So `profile` here doesn't have a `role` property.
        // But on other providers, you'd add the role here through it.
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: "user",
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, account, profile }) {
      // Normally, it would be like this
      // if(user) return {...token, role: token.role}
      // return token

      // But because Github's provider is not passing the role
      // (it should, according to https://authjs.dev/guides/role-based-access-control#with-jwt -
      // maybe it's because v5 is still in beta), we're just gonna append it every time
      return {...token, role: "user"}
    },
    session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
});
```

As usual, let's break it down!

- the `GitHub` provider accepts a **`profile()`** callback.
In this callback, we receive a `Profile` returned by the `OAuth` provider
(in our case, it's `GitHub`).
We can return a subset using the profile's information
to **define user's information in our application**.
By default, it returns the
`id`, `email`, `name`, `image`,
but we can add more.
That's what we did, by adding the **`role`** property.

> [!NOTE]
>
> If you're using a custom provider,
> it is your responsibility to return the role so you can capture it in
> your `Next.js`/`Nextra` application.

- we defined **`callbacks`** to add the role to our `JWT` tokens
and `session` cookies.
In order, the `jwt` callback receives the user information we've defined earlier.
We append the `role` to the token.
Afterwards, the `session` callback is invoked,
where we use the `role` property we've just appended to the `token`
and add it to the `session` cookie.

> [!NOTE]
>
> In our code, we hardcode it every time.
> It is because, at the time of writing,
> `next-auth` is releasing a `v5`,
> which has some bugs,
> including the `GitHub` provider not properly downstreaming the user
> to the `jwt` and `session` callbacks.
> They receive the `user` as `undefined`.
>
> Unfortunately, this not an isolated occurrence.
> https://stackoverflow.com/questions/76986309/nextauth-nextjs-13-unable-to-add-user-role
> describes our exact scenario
> and doesn't have an answer 😕.
>
> Here are a few more examples.
> Hopefully it will be resolved in time:
> - https://github.com/nextauthjs/next-auth/issues/9836
> - https://github.com/nextauthjs/next-auth/discussions/9609
> - https://stackoverflow.com/questions/72073321/why-did-user-object-is-undefined-in-nextauth-session-callback
> - https://github.com/nextauthjs/next-auth/discussions/8456
>
> If you're using a custom provider,
> it seems this is unlikely to happen to you.
> In the links above,
> people found solutions using custom providers
> and not the in-built ones, like we are using in this demo.


> [!IMPORTANT]
>
> To make the experience better for the user,
> we can implement a **refresh token rotation system**,
> where once a token expires,
> the application automatically refreshes it instead of asking the user to sign in again.
>
> Read https://authjs.dev/guides/refresh-token-rotation to implement this with `next-auth`.

But that's not all!
Because we are effectively
*extending* the properties of the `User`,
we can [**augment it through types**](https://authjs.dev/getting-started/typescript#module-augmentation),
so `Typescript` doesn't complain about `role`
being an `undefined` property.

In the same `auth.ts` file,
add the following code at the top.

```ts
import GitHub from "next-auth/providers/github";
import NextAuth, { type DefaultSession } from "next-auth";
// we don't use these but we need to import something so we can override the interface
import {  DefaultJWT } from "next-auth/jwt";
import { AdapterSession } from 'next-auth/adapters';

// We need to add the role to the JWT inside `NextAuth` below, so the `middleware.ts` can have access to it.
// The problem is that it wasn't added this `role` custom field, even if we defined it in `auth.ts`.
// Apparently, the problem is with the types of `next-auth`, which we need to redefine.
// See https://stackoverflow.com/questions/74425533/property-role-does-not-exist-on-type-user-adapteruser-in-nextauth
// and see https://authjs.dev/getting-started/typescript#module-augmentation.

declare module "next-auth" {
  interface Session extends DefaultSession {
    /**
     * By default, TypeScript merges new interface properties and overwrites existing ones.
     * In this case, the default session user properties will be overwritten,
     * with the new ones defined above. To keep the default session user properties,
     * we need to add them back into the newly declared interface.
     */
    user: DefaultSession["user"] & {
      role?: string;
    };
  }

  interface User {
    // Additional properties here:
    role?: string;
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    // Additional properties here:
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}
```

And that's it! 🎉
Give yourself a pat on the back!

Now that we have the authentication and authorization set up,
it's time to *finally use it*.


## 4. Generating private routes

As you may have noticed by now,
`Nextra` statically generates the page for you
following the structure and the `_meta.json` files
that you define in your project.
These changes are then reflected in your navbar and sidebar.

However, there is *no way for us to define private routes*
and **use them at build-time**,
like you do when generating the pages with `Nextra`.
Unfortunately, `Nextra` doesn't have this feature in place,
and authentication is not something they had in mind to implement
for a framework that was primarily meant for public-facing documentation.

*However*, it is possible to do this,
considering what was discussed in
[3.1 A word about `middleware.ts`](#31-a-word-about-middlewarets),
_as long as we have access to the private routes at **build-time**_.

To accomplish this, we're using [`ts-morph`](https://ts-morph.com/),
a package that will allow us to manipulate Typescript source files.
We will create a script with `ts-morph` that manipulates the `const privateRoutesMap` inside `middleware.ts`.
This script will populate the `const` with all the private routes
and the needed roles to access them.

Let's crack on!


### 4.1 Installing `ts-morph` and setup

Install `ts-morph`, [`ts-node`](https://www.npmjs.com/package/ts-node) (to run the script we're implementing)
and [`fast-glob`](https://www.npmjs.com/package/fast-glob)
(to traverse the file system).

```sh
pnpm add ts-morph ts-node fast-glob
```

After installing these dependencies,
we will have to adjust our `tsconfig.json` file
so we can run our script independently.
Below the `exclude` property, in the last line,
add the following piece of code.

```json
  "exclude": ["node_modules"],

  // These are only used by `ts-node` to run the script that generates the private routes.
  // These options are overrides used only by ts-node, same as the --compilerOptions flag and the TS_NODE_COMPILER_OPTIONS environment variable
  "ts-node": {
    "compilerOptions": {
      "module": "commonjs"
    }
  },
```

Great!
Let's start implementing our script now.


### 4.2 Creating `generatePrivateRoutes.ts`

In the root of the project,
create a file called `generatePrivateRoutes.ts`.
Add the following code.

```ts
import { Project } from "ts-morph";
import path from "path";
import fs from "fs";
import { globSync } from "fast-glob";

// - - - - - - - - - - - - - - - - - -  - - - - -
// `middleware.ts` is changed by executing the code below.

const CONST_VARIABLE_NAME = "privateRoutesMap"; // Name of the constant inside `middleware.ts` to be manipulated
const DIRECTORY = "pages"; // Directory to look for the routes (should be `pages`, according to Nextra's file system)

export function changeMiddleware() {

  // Get private routes
  const pagesDir = path.join(__dirname, DIRECTORY);
  const privateRoutes = getPrivateRoutes(pagesDir);
  
  // Initialize the project and source file
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(path.resolve(__dirname, "middleware.ts"));
  
  // Find the variable to replace and change it's declaration
  const variable = sourceFile.getVariableDeclaration(CONST_VARIABLE_NAME);
  if (variable) {
    variable.setInitializer(JSON.stringify(privateRoutes));
    sourceFile.saveSync();
  } else {
    console.error("Variable not found in `middleware.ts`. File wasn't changed.");
  }  
}

export default {
  changeMiddleware: () => changeMiddleware()
}
```

The code is fairly simple.
We get the private routes by calling a function called `getPrivateRoutes()`
(which we will implement shortly).
Then, we find the `middleware.ts` file
and find the variable we want to change.
If we do find it, we change its initialization
to the private routes map we retrieved earlier.
Otherwise, we log an error.

Now, it's time to add the function
that will *retrieve the private routes*!


### 4.3 Implementing private route retrieval function

Our function `getPrivateRoutes` will need to recursively iterate
over a given folder directory and find a way to know which routes are private.
As of now, there's no way of doing so.

That's why we're going
**to define a new property inside `_meta.json` files**.


#### 4.3.1 Defining `_meta.json` files with `private` properties

We need to tell our function which pages/routes are private.
To do this, we are going to use the `_meta.json` files
that come with `Nextra`.

To achieve this,
we are going to allow people to declare a route as private
by adding a **`private`** property to a route defined in the respective `_meta.json`.

```json
// pages/_meta.json
{
  "index": {
    "title": "Homepage",
    "type": "page",
    "display": "hidden"
  },
  "reference_api": {
    "title": "API Reference",
    "type": "page",
    "private": {                // We add this property to make `reference_api` private
      "private": true,
      "roles": ["user"]
    }
  },
  "about": {
    "title": "About Us",
    "type": "page"
  },
  "contact": {
    "title": "Contact Us",
    "type": "page"
  },
  "github_link": {
    "title": "Github",
    "href": "https://github.com/shuding/nextra",
    "newWindow": true,
    "display": "hidden"
  }
}
```

As you can see, we've added a property called **`private`**
to the `reference_api` route,
where we define if it's private or not by boolean in the `private` property
and where we define the roles that can access it
in the `roles` property.

Alternatively, people can define private routes by simply
passing `"private": true`, instead of passing an object.
In these cases, the `roles` empty will default to an empty array,

```json
  "reference_api": {
    "title": "API Reference",
    "type": "page",
    "private": true             // Simpler version
  },
```

We'll take into account both of these scenarios.


#### 4.3.2 Implementing the function

Okay, now let's start coding our function!
Inside `generatePrivateRoutes.ts`,
add this function above the `ts-morph` code
we've written earlier.

```ts
// Types for the `_meta.json` structure
type PrivateInfo = {
  private: boolean;
  roles?: string[];
};

type MetaJson = {
  [key: string]: string | any | PrivateInfo;
};

type PrivateRoutes = {
  [key: string]: string[];
};

/**
 * This function looks at the file system under a path and goes through each `_meta.json` looking for private routes recursively.
 * It is expecting the `_meta.json` values of keys to have a property called "private" to consider the route as private for specific roles.
 * If a parent is private, all the children are private as well. The children inherit the roles of their direct parent.
 * @param pagesDir path to recursively look for.
 * @returns map of private routes as key and array of roles that are permitted to access the route.
 */
function getPrivateRoutes(pagesDir: string): PrivateRoutes {
  let privateRoutes: PrivateRoutes = {};

  // Find all _meta.json files recursively
  const metaFiles = globSync(path.join(pagesDir, "**/_meta.json"));

  // Variable to keep track if parent is private on nested routes and its role
  const rootPrivateSettings: { [key: string]: { private: boolean; roles: string[] } } = {};

  // Iterate over the found meta files
  for (const file of metaFiles) {
    // Get the path of file and read it
    const dir = path.dirname(file);
    const metaJson: MetaJson = JSON.parse(fs.readFileSync(file, "utf-8"));

    // Iterate over the key/value pairs of the "_meta.json" file
    for (const [key, meta] of Object.entries(metaJson)) {
      const route = path.join(dir, key).replace(pagesDir, "").replace(/\\/g, "/");

      // Check if the current meta has a "private" property
      if (meta.private !== undefined) {
        if (typeof meta.private === "boolean") {
          if (meta.private) {
            privateRoutes[route] = [];
            rootPrivateSettings[dir] = { private: true, roles: [] };
          }
        }
        // If the "private" property is an object with possible roles
        else if (meta.private.private === true) {
          const roles = meta.private.roles ? meta.private.roles : [];
          privateRoutes[route] = roles;
          rootPrivateSettings[dir] = { private: true, roles: roles };
        }
      } else {
        // Check if the parent folder is private and inherit roles
        const parentDir = path.resolve(dir, "..");
        if (rootPrivateSettings[parentDir] && rootPrivateSettings[parentDir].private) {
          const parentRoles = rootPrivateSettings[parentDir].roles;
          privateRoutes[route] = parentRoles;
        }
      }
    }
  }

  // Now let's just do a second pass to clean-up possible unwanted/invalid routes
  for (const route of Object.keys(privateRoutes)) {
    const fullPath = path.join(pagesDir, route);
    const lastSegment = route.split("/").pop();

    // Remove separators or any route that doesn't correspond to an existing file/directory
    if (lastSegment === "---") {
      delete privateRoutes[route];
      continue;
    }

    // Check for the existence of .mdx file
    const mdxPath = `${fullPath}.mdx`;
    if (!fs.existsSync(fullPath) && !fs.existsSync(mdxPath)) {
      delete privateRoutes[route];
    }
  }

  return privateRoutes;
}
```

Whoa, that's a lot!
The code is fairly documented so you can follow along easier.
But the gist of it is:
- we use `fast-glob` to find all the `_meta.json` files recursively.
- we iterate over the `_meta.json` files.
  - in each `_meta.json`, we look over the key-value pairs to construct the route.
  - in each key-value, we check for the `private` property and resolve its boolean.
  - while iterating, we keep track of the routes and check if the parent is also private. If the parent is private, the child must be private too. It also inherits the direct parent's roles.
- after iteration, we do a second pass to clean-up possible invalid routes.
- we return a map of `private route` as **key** and `roles array` as **value**.

And that's it!


### 4.4 Running the script before building

Now that we have our handy-dandy script ready,
we need to make sure it always gets executed before running our application,
whether it is being built for production
or compiling to be running on `localhost`.

To do this, we only need to change our `package.json` file.
Head over there and change the scripts, like so:

```json
  "scripts": {
    "private-route-gen": "ts-node -e \"import gen from './src/generatePrivateRoutes'; gen.changeMiddleware()\"",
    "dev": "npm run private-route-gen && next",
    "prebuild": "npm run private-route-gen",
    "build": "next build",
    "start": "next start"
  },
```

We've created a `private-route-gen`
that uses `ts-node` to run our script.
This newly added script is executed
when running `pnpm run dev` (running the app locally)
and `pnpm run build`.
[We've added it to the `prebuild` script](https://kontent.ai/blog/how-to-run-scripts-before-every-build-on-next-js/)
so it executes before production builds.

And that's it!
Now every time you run your application,
we are sure that the private routes are correctly materialized!

Hurray! 🎉


> [!NOTE]
>
> You may get an error when building the project saying:
>
> ```
> Error validating _meta.json file for "reference_api" property.
> Unrecognized key(s) in object: 'private'
> ```
>
> This is expected, since `Nextra` doesn't know what the `private` property is.
> This doesn't affect the performance of the application,
> it's simply a warning.


## 5. Moving source files to `src` folder

Before proceeding, let's do some cleaning up 🧹.
Right now, we have some source files
(like `auth.ts`, `middleware.ts`, `generatePrivateRoutes.ts`)
mixed with several configuration files at root level.

Luckily for us, `Next.js` supports adding a `src` folder
so we can keep the root directory focused on configuration files
and the `src` folder to source files.

Let's move our source code to a `src` folder!
Start by creating it at root level.
Then, move the following items into it:
- the `app` folder.
- the `components` folder.
- the `pages` folder.
- `auth.ts`, `middleware.ts` and `generatePrivateRoutes.ts` files.

Now we have to change some imports.
Check the following changes in each file so everything works again!

```ts
// src/pages/index.mdx
import { auth } from "@/src/auth.ts"    // changed from `@/auth.ts`
import { useData } from 'nextra/data'
import Link from 'next/link'
import { signOut } from "next-auth/react"
import LoginOrUserInfo from "@/src/components/LoginOrUserInfo" // changed from `@/components/LoginOrUserInfo`
```

```ts
// src/middleware.ts
"server only";

import { auth } from "@/src/auth";    // changed from `@/auth.ts`
import { NextResponse } from "next/server";
```

```ts
// tests/unit/LoginOrUserInfo.test.tsx
import { render, screen } from "@testing-library/react";
import LoginOrUserInfo from "@/src/components/LoginOrUserInfo";   // changed from `@/components/LoginOrUserInfo`
import { DefaultSession } from "next-auth";
import { signOut, signIn } from "next-auth/react";
```

```json
// package.json
"private-route-gen": "ts-node src/generatePrivateRoutes.ts",
```

And you're sorted!
We now have all our source files inside `src`,
the tests inside `tests`,
and all the configuration files at root level.


## 6. Adding custom theme

Now that we've protected some routes through the `middleware.ts` file,
we need to go a bit further.
It doesn't make sense for public people to see the private routes,
either be it on the **sidebar** or on the **navbar**.

For this, we can go about this with two options:

1. we **customize the default theme** through `theme.config.jsx` (https://nextra.site/docs/docs-theme/theme-configuration#customize-the-navbar),
where we check [each sidebar title and hide it](https://nextra.site/docs/docs-theme/theme-configuration#docs-repository)
and [override the whole navbar](https://nextra.site/docs/docs-theme/theme-configuration#customize-the-navbar).

2. use the code from the [`nextra-theme-docs`](https://github.com/shuding/nextra/tree/main/packages/nextra-theme-docs)
to keep the default theme, use it as a `custom-theme` in `theme.config.jsx`
and try to conditionally render each link according to the person's role.

Although you can go with `Option 1` for simplicity sake,
we are going with `Option 2` for three main reasons:

- we want to keep the same look n' feel of the application as it stands.
- we don't want to re-implement and waste the time trying to do so.
- we want to have access to the `private` property we've defined inside `_meta.json` files,
which can only be made through augmenting the types of the `nextra-docs-theme` source code.

With this in mind, let's do this!


### 6.1 Copying the `nextra-theme-docs`


Download the directory from https://github.com/dwyl/nextra-demo/tree/34a6327e00b941b50dffdbbed99ab6bf294511a4/theme.
This directory is a version of [`nextra-theme-docs`](https://github.com/shuding/nextra/tree/main/packages/nextra-theme-docs)
**with a few modifications** (they are explained in the `README.md` inside the directory).

Long story short, the differences are:
- we've imported some [`nextra` components](https://github.com/shuding/nextra/tree/main/packages/nextra/src/components)
from the original package and placed it inside the theme.
- moved some code from `src/constants.tsx` to `src/contexts/config.tsx`.
This is because, as is, the code threw a
`ReferenceError: Cannot access 'DEFAULT_THEME' before initialization` error.
- removed `tailwind.config.js` and `postcss.config.js`.
We'll be using these on the **root of the project** instead.

After downloading this directory,
put all of the downloaded code inside a new directory called `theme`.


### 6.2 Installing `TailwindCSS` and setting up `pnpm` workspace

For this to work,
we'll have to install `TailwindCSS` on our project.
This is what the custom theme depends on to properly render their components.

For this, open the terminal and type `pnpm install tailwindcss postcss autoprefixer`.

Next up, let's create two files:
`tailwind.config.js` and `postcss.config.js`.
These two files are from the original theme.

```js
// tailwind.config.js

const colors = require('tailwindcss/colors')

const makePrimaryColor =
  l =>
  ({ opacityValue }) => {
    return (
      `hsl(var(--nextra-primary-hue) var(--nextra-primary-saturation) ${l}%` +
      (opacityValue ? ` / ${opacityValue})` : ')')
    )
  }

/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'nx-',
  content: [
    './theme/src/**/*.tsx',
    './theme/src/nextra_icons/*.tsx',
    './theme/src/nextra_components/*.tsx'
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem'
    },
    letterSpacing: {
      tight: '-0.015em'
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      white: '#fff',
      gray: colors.gray,
      slate: colors.slate,
      neutral: colors.neutral,
      red: colors.red,
      orange: colors.orange,
      blue: colors.blue,
      yellow: colors.yellow,
      primary: {
        50: makePrimaryColor(97),
        100: makePrimaryColor(94),
        200: makePrimaryColor(86),
        300: makePrimaryColor(77),
        400: makePrimaryColor(66),
        500: makePrimaryColor(50),
        600: makePrimaryColor(45),
        700: makePrimaryColor(39),
        750: makePrimaryColor(35),
        800: makePrimaryColor(32),
        900: makePrimaryColor(24)
      }
    },
    extend: {
      colors: {
        dark: '#111'
      }
    }
  },
  darkMode: ['class', 'html[class~="dark"]']
}
```

```js
// postcss.config.js
/** @type {import('postcss').Postcss} */
module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    'postcss-lightningcss': {
      browsers: '>= .25%'
    }
  }
}
```

And that's it for the `TailwindCSS` part of things!
Now, because our `theme` directory has its own set of dependencies,
we need to tell our root project that information!
We want it to install and use its dependencies.
For this, we leverage [**`pnpm` Workspaces**](https://pnpm.io/workspaces)
to install and update dependencies in a single `pnpm install` command!

For this, we have to:
- give our root project's workspace a name.
We can do this by going to `package.json` and adding the line
`"name": "nextra"` on top.
- create a `pnpm-workspace.yaml` file.

```yaml
packages:
  - '.'
  - 'theme'
```


### 6.3 Using `TailwindCSS` globally

Now that we've installed `TailwindCSS`,
let's *use it* in our application!

For our theme to work, we need to create a `.css` file
and import it in our `Pages Router` so it is used throughout our application pages.
To do this,
create a file inside `src` - `src/globals.css`.

```css
/* Use the theme's styles CSS file */
@import "../theme/css/styles.css"
```

Easy enough, right?
We are simply using the `theme`'s styles in our own application's styles!
Now we just need *to use it in our application*.
To do this,
we are going to be using a [**custom app component**](https://nextjs.org/docs/pages/building-your-application/routing/custom-app),
which is called to initialize pages.
We are going to override it to inject our styles.

Inside `src/pages`, create a file called `_app.tsx`.

```tsx
// These styles apply to every route in the application
import '@/src/globals.css'
import type { AppProps } from 'next/app'
 
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
```

And that's it!

The *very last thing we need to do*,
is to **tell `Nextra` we want to use our custom theme**.
For this, simply head over to `next.config.js`
and change the `theme` property
to the directory of our newly created `theme` directory.

```js
const withNextra = require("nextra")({
  theme: "./theme/src/index.tsx",      // change here
  themeConfig: "./theme.config.jsx",
  defaultShowCopyCode: true
});

module.exports = withNextra();
```

If you run `pnpm run dev`, you should be able to see the application running as before!


## 7. Conditional rendering on components

Now that we have our custom theme properly setup and added to our application,
we now have the opportunity to do whatever we want with the components.
In our case, it is *extremely useful*
to **conditionally render links of protected routes according to the logged user**.


### 7.1 With which methods can we do this?

`auth.js` provides us a few ways of authenticating people
and getting their session.
`Next.js` is moving to a `server-side`-first approach
with their *`app router`*
with [the introduction of `Server Components`](https://nextjs.org/docs/app/building-your-application/rendering/server-components).
So this should be our approach.

*However*, `Nextra` does [**not yet support `app router`**](https://github.com/shuding/nextra/issues/2023).
This makes it so that the statically rendered pages are **client components**.
If we take a look at [`auth.js`'s documentation](https://authjs.dev/getting-started/migrating-to-v5#authenticating-server-side),
we quickly realise that we can't use the `auth()` call like we did in `src/middleware.ts`
inside our theme's components.
In fact, we can only use [`useSession()`](https://next-auth.js.org/getting-started/client#usesession)
to fetch the current session of the logged in person.

> [!NOTE]
>
> We *did try* using the `auth()` call,
> but we were always prompted with the same error:
> ```
> unhandledRejection: Error: `headers` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context
> ```
> Reading the link in the error,
> this happens because calling `headers()` is made within the library,
> which *is out of the scope of the theme*, making it impossible to do it "server-side".
>
> Even after [updating the `handlers` inside `app/api/auth/[...nextauth]/route.ts`](https://github.com/vercel/next.js/issues/50679#issuecomment-1573705463)
> and simply overriding the default theme through `theme.config.jsx`,
> the same error occurred.

While this may seem not like the ideal scenario,
it's important to stress **that the routes are still protected**
and that the issued [`JWT` are encrypted by default.](https://authjs.dev/reference/core/jwt).
So, while very unlikely, the person may *know some links exist*,
but they can't access it,
as they are protected server-side through `middleware.ts`.


### 7.2 Using `useSession()`

Now that we know we're using the `useSession()` hook to retrieve the person's current session,
let's make some changes to our code so we can use it!

The first thing we need to do
is to wrap our app with [`<SessionProvider>`](https://next-auth.js.org/getting-started/client#sessionprovider).
This will ensure the session is accessible throughout the application.

Head over to `src/pages/_app.tsx`,
and change it to the following.

```ts
// These styles apply to every route in the application
import '@/src/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />;
    </SessionProvider>
  )
}
```

Awesome!

Before proceeding, let's do some housekeeping 🧹.
We *know* we are going to need two things:
- use the extended `User` interface
that we augmented inside `auth`.
- use the `PrivateInfo` type inside `src/generatePrivateRoutes.ts`
to know whether a menu item is private or not.

Let's start with the first one.
Inside `src/auth.ts`,
locate the augmented `Session` interface.
Change it to the following.

```ts
import { ExtendedUser } from './types';         // added this

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: ExtendedUser                          // changed here


  }

  interface User {
    // Additional properties here:
    role?: string;
  }
}
```

Notice that we've created an `ExtendedUser` interface
that is imported from `types.ts`.
We haven't created this file.
So let's do it!
Inside `src`, create a file called `types.ts`.

```ts
import { type DefaultSession } from 'next-auth';
/**
 * Holds types for the application (on the `src` side)
 */

// Types for the `_meta.json` structure
export type PrivateInfo = {
  private: boolean;
  roles?: string[];
};

export type MetaJson = {
  [key: string]: string | any | PrivateInfo;
};

export type PrivateRoutes = {
  [key: string]: string[];
};

// Types for auth
export type ExtendedUser = {
    role?: string;
  } & DefaultSession["user"];
```

Notice that we simply moved the extended user code
to `ExtendedUser` inside this file.
In addition to this, we have also copied the types
from `src/generatePrivateRoutes.ts` to here, as well.
All that is left to do is update `src/generatePrivateRoutes.ts`
to import these!

```ts
// generatePrivateRoutes.ts
import { PrivateRoutes, MetaJson } from './types';

// delete the types
// ...
```

And that's it!
We're ready to rock and roll! 🎸


### 7.3 Rendering links inside `navbar`

Let's start by conditionally rendering the links
inside the `navbar`.

First let's go `theme/src/types.ts`
and add two additional types for the
`PageItem` and `MenuItem` types
that are used inside `theme/src/components/navbar.tsx`.

Add the following lines.

```ts
// `theme/src/types.ts`

import type { MenuItem, PageItem } from 'nextra/normalize-pages'
import { PrivateInfo } from '../../src/types';

// Extends the PageItem and MenuItem with the `private` property
export type ExtendedPageItem = { private?: PrivateInfo } & PageItem;
export type ExtendedMenuItem = { private?: PrivateInfo } & MenuItem;
```

We are simply extending the `PageItem` and `MenuItem` types
with the `PrivateInfo` interface that we moved earlier.
This way, we'll have access to the `private` property when writing code
inside `navbar.tsx`!

Speaking of which,
let's finally change the `navbar.tsx` component!
Head over to `theme/src/components/navbar.tsx`

First, locate the `NavBarProps` type
on top of the file and change it accordingly.
We are extending our items' types with the extended types we've defined before
so we can access the `private` property.

```ts
export type NavBarProps = {
  flatDirectories: Item[]
  items: (ExtendedPageItem | ExtendedMenuItem)[]
}
```

Now we're ready to make some changes to the `NavBar` function.
Head over to this function and use the `useSession()` hook.

```ts
// theme/src/components/navbar.tsx

import { useSession } from "next-auth/react"
import { ExtendedPageItem, ExtendedMenuItem } from '../types';
import { ExtendedUser } from '../../../src/types';

export function Navbar({ flatDirectories, items }: NavBarProps): ReactElement {
  const config = useConfig()
  const activeRoute = useFSRoute()
  const { menu, setMenu } = useMenu()

  const {data, status: session_status} = useSession()     // add this
  const user = data?.user as ExtendedUser                 // add this

  return (
    ...
  )
```

Great!
We are now successfully using the `useSession()` hook
and getting the authenticated (or not) person's session data.
Now we can leverage this data
to conditionally render the links inside our `NavBar`!

Because the `Session` object returned by `useSession`
also has a `status` 
[(that can be either `"loading"`, `"authenticated"` or `"unauthenticated"`)](https://next-auth.js.org/getting-started/client#usesession),
we will have to take this into account when changing
how the `NavBar` renders the links.

Other than this,
all we have to do is block the rendering
of links that the user is **not allowed to see**.
Locate the `return` of the `NavBar` function
and implement the following changes.

```ts
  return (
    <div>
      <div/>
      <nav>
        {config.logoLink ? (
          <Anchor
            href={typeof config.logoLink === 'string' ? config.logoLink : '/'}
            className="nx-flex nx-items-center hover:nx-opacity-75 ltr:nx-mr-auto rtl:nx-ml-auto"
          >
            {renderComponent(config.logo)}
          </Anchor>
        ) : (
          <div className="nx-flex nx-items-center ltr:nx-mr-auto rtl:nx-ml-auto">
            {renderComponent(config.logo)}
          </div>
        )}
        {items.map(pageOrMenu => {

          // Start of changes -------------------

          // Wait until the session is fetched (be it empty or authenticated)
          if(session_status === "loading") {
            return null
          }

          // If it's a public user but the link is marked as private, hide it
          if(session_status === "unauthenticated") {
            if(pageOrMenu.private) return null
          }

          // If the user is authenticated
          // and the page menu is protected or the role of the user is not present in the array, we block it
          if(session_status === "authenticated" && user) {
            if (pageOrMenu.private?.private) {
              const neededRoles = pageOrMenu.private.roles || []
              const userRole = user.role
              if(!userRole || !neededRoles.includes(userRole)) {
                return null
              }
            }
          }

          // End of changes -------------------

          if (pageOrMenu.display === 'hidden') return null

          // ...
        })}
  )
```

Let's break down what we just implemented:
- we check if the session status is `"loading"`.
If so, we render nothing.
- if the session status is `"unauthenticated"`
*and* the route is private,
we don't render the title for the person to see.
- if the session status is `"authenticated"`,
it means the person has a session and is logged in.
If the route is private,
we check if the person has the necessary role to see it.
If they don't, we don't render it for the person to see.

And that's it!
We can test this behaviour!
If we run our application as is
(`pnpm run dev`),
we'll see how everything is the same.
That's because our person has the `"user"` role,
which is allowed under `api_reference`.


<p align="center">
  <img width='800' src="https://github.com/dwyl/nextra-demo/assets/17494745/fbe63c64-e97e-446a-9234-f1e9871451ac"/>
</p>

However, if we head over to `src/auth.ts`
and change the role to something different...

```ts
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: providers,
  callbacks: {
    jwt({ token, user, account, profile }) {
      return { ...token, role: "another_role" };   // changed here
    },
    session({ session, token }) {
      session.user.role = token.role
      return session;
    },
  },
});
```

And run the application again,
you'll see that the title is hidden!

<p align="center">
  <img width='800' src="https://github.com/dwyl/nextra-demo/assets/17494745/6d65a3e9-386e-45ed-937a-5ed584800a3f"/>
</p>

Hurray! 🎉

Because we're going to be using this feature of conditionally hiding links,
let's make it a function so we can use it in other places
(namely the `sidebar`).

Inside `theme/src/utils/render.tsx`,
add the following function.
This function is the same code that we just wrote inside `navbar.tsx`.

```ts
import { ExtendedUser } from "../../../src/types";
import { ExtendedItem, ExtendedPageItem, ExtendedMenuItem } from "../types";
import { SessionContextValue } from "next-auth/react";

export function shouldLinkBeRenderedAccordingToUserRole(
  session: SessionContextValue<boolean>,
  item: ExtendedItem | ExtendedPageItem | ExtendedMenuItem
) {
  const { data, status: session_status } = session;
  const user = data?.user as ExtendedUser;

  // Wait until the session is fetched (be it empty or authenticated)
  if (session_status === "loading") return false;

  // If it's a public user but the link is marked as private, hide it
  if (session_status === "unauthenticated") {
    if (item.private) return false;
  }

  // If the user is authenticated
  // and the page menu is protected or the role of the user is not present in the array, we block it
  if (session_status === "authenticated" && user) {
    if (item.private?.private) {
      const neededRoles = item.private.roles || [];
      const userRole = user.role;
      if (!userRole || !neededRoles.includes(userRole)) {
        return false;
      }
    }
  }

  return true;
}
```

Great!
Now we just need to use it inside our `navbar.tsx` file.

```ts
// theme/src/components/navbar.tsx

// ...

// Old code --
const {data, status: session_status} = useSession()
const user = data?.user as ExtendedUser

// New code --
const session = useSession()

// ...

// Old code --
if(session_status === "loading") return null

if(session_status === "unauthenticated") {
  if(pageOrMenu.private) return null
}

if(session_status === "authenticated" && user) {
  if (pageOrMenu.private?.private) {
    const neededRoles = pageOrMenu.private.roles || []
    const userRole = user.role
    if(!userRole || !neededRoles.includes(userRole)) {
      return null
    }
  }
}

// New code --
if(!shouldLinkBeRenderedAccordingToUserRole(session, pageOrMenu))
  return null
```

Awesome!
This makes things simple for the rest of our guide!


### 7.4 Rendering links inside `sidebar`

To conditionally render inside `theme/src/components/sidebar.tsx` takes a bit more work.
This is because this component is used to display both the structure of the document inside each page
but also to showcase the menu in mobile.

#### 7.4.1 Understanding how directory items are passed down to the `sidebar`

If you take a look inside the `sidebar.tsx` file,
you will find the following piece of code.

```ts
interface SideBarProps {
  docsDirectories: PageItem[]
  flatDirectories: Item[]
  fullDirectories: Item[]
  asPopover?: boolean
  headings: Heading[]
  includePlaceholder: boolean
}
```

These are the props that are passed on to the `Sidebar` function component.
What's important is what `docsDirectories`, `flatDirectories` and `fullDirectories` pertain to.
If we look at https://github.com/dwyl/nextra-demo/blob/fd8f09a9c5cfa4cb4f9d7f486663e4e330619492/theme/src/index.tsx#L121-L140, 
we'll see that these three parameters are fetched from calling the `normalizePages()` function
from the `nextra/normalize-pages` package.

- **`docsDirectories`** are used in the sidebar menu
when in desktop mode.
You can find it on the left side of the screen,
showing the structure of the page
and of the parent directory.

<p align="center">
  <img width='800' src="https://github.com/dwyl/nextra-demo/assets/17494745/30b18dd1-51d5-432f-bc57-842bcf97f62a"/>
</p>

> [!IMPORTANT]
> **This array can be extended so it includes our custom `private` property we've added to the `_meta.json` files.**
> This can be done with the types we've defined earlier in `theme/src/types.ts`.


- **`fullDirectories`** are used in the sidebar menu
in mobile mode.
The sidebar here takes on a role of both the **`navbar`**
and **the page contents**.
So, it will show the page routes alongside its children
(hence the name `fullDirectories`).

<p align="center">
  <img width='800' src="https://github.com/dwyl/nextra-demo/assets/17494745/5a460efc-4855-4cf6-9a00-d71bdc03761f"/>
</p>

> [!IMPORTANT]
> **This array can be extended so it includes our custom `private` property we've added to the `_meta.json` files.**
> This can be done with the types we've defined earlier in `theme/src/types.ts`.

- **`flatDirectories`** are used inside the search component.

> [!IMPORTANT]
> **This array can NOT be extended with the `private` property we've added to the `_meta.json` files, at least [through normal augmentation](https://www.digitalocean.com/community/tutorials/typescript-module-augmentation)**.
> To include the `private` property in each item of this array,
> we'll have to find another way.
> For this section, we won't be needing to use this array, though.

Now that we have an idea what each `xxxDirectories` paramater pertains to,
let's redefine them with our extended types.
Inside `theme/src/components/sidebar.tsx`,
change it to the following.

```ts
// theme/src/components/sidebar.tsx
interface SideBarProps {
  docsDirectories: ExtendedPageItem[]   // they have the `private` property
  flatDirectories: ExtendedItem[]       // they DON'T have the `private` property (used for search)
  fullDirectories: ExtendedItem[]       // they have the `private` property
  asPopover?: boolean
  headings: Heading[]
  includePlaceholder: boolean
}
```

Great!
We are using a new type `ExtendedItem` that we haven't defined yet.
Let's do that inside `theme/src/types.ts`, alongside the others.

```ts
// theme/src/types.tsx

export type ExtendedItem = { private?: PrivateInfo } & Item;
```

Awesome! 🥳


#### 7.4.2 Conditionally rendering links in `Menu` inside the `sidebar`

If we take a closer look inside `navbar.tsx`,
you will see the `Menu` function
is what renders the links
(it either receives `fullDirectories` or `docDirectories` arrays).

So this is the function where we want to make changes! 😊

First, let's change the `MenuProps`
to our extended types
so we have access to the `private` property 
we've defined inside our `_meta.json` files.

```ts
interface MenuProps {
  directories: ExtendedPageItem[] | ExtendedItem[]    // change here
  anchors: Heading[]
  base?: string
  className?: string
  onlyCurrentDocs?: boolean
}
```

And now, inside the `Menu` function,
simply do the same thing we've done in the `navbar`!

```ts
function Menu({
  directories,
  anchors,
  className,
  onlyCurrentDocs
}: MenuProps): ReactElement {

  const session = useSession()

  return (
    <ul className={cn(classes.list, className)}>
      {directories.map(item => {

        if(!shouldLinkBeRenderedAccordingToUserRole(session, item))
          return null

        return !onlyCurrentDocs || item.isUnderCurrentDocsTree ? (
          item.type === 'menu' ||
          (item.children && (item.children.length || !item.withIndexPage)) ? (
            <Folder key={item.name} item={item} anchors={anchors} />
          ) : (
            <File key={item.name} item={item} anchors={anchors} />
          )
        ) : null
      }

      )}
    </ul>
  )
}
```

We are calling the `useSession()` hoook
and using the `shouldLinkBeRenderedAccordingToUserRole()` function to render the links
according to the person role!

And that's it!
Congratulations,
we've just conditionally rendered
all the private properties in both our `sidebar` and `navbar`!

You may notice that the `mega_private` directory
is completely hidden from the sidebar.
This is because our person has a `"user"` role,
which is different to what this directory requires.

<p align="center">
  <img width='800' src="https://github.com/dwyl/nextra-demo/assets/17494745/30b18dd1-51d5-432f-bc57-842bcf97f62a"/>
</p>

Great job! 🎉



# Change theme

- custom theme is the only option
- although you can change some aspects of the sidebar 
  https://nextra.site/docs/docs-theme/theme-configuration#customize-sidebar-content 
  you can't (yet) do it on the navbar:
  [nextra#2799](https://github.com/shuding/nextra/discussions/2799).
  Either way, the way Nextra does it doesn't allow us 
  to have access to the authorization and change the display accordingly. 
  We need to go deeper.

# Zones 

See:
[nextra#93](https://github.com/shuding/nextra/discussions/93)
More to come soon! 


Thanks for learning with us!
If you find it useful, 
please give the repo a star! ⭐️

[![HitCount](https://hits.dwyl.com/dwyl/nextra-demo-tutorial.svg?style=flat-square)](https://hits.dwyl.com/dwyl/nextra-demo)