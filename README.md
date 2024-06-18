<div align="center">

# Learn Nextra

[![HitCount](https://hits.dwyl.com/dwyl/nextra-demo.svg?style=flat-square)](https://hits.dwyl.com/dwyl/nextra-demo)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](https://github.com/dwyl/nextra-demo/issues)

A comprehensive demo 
of using `Nextra` for documentation.
Learn how to create a site with 
**authentication** 
(private pages), 
search and analytics!

</div>

<!--
Note: the Table of Contents is auto-generated/updated by Markdown All-in-One 
https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one
-->

- [Learn Nextra](#learn-nextra)
- [Why?](#why)
- [What?](#what)
- [Who?](#who)
- [How?](#how)
  - [0. Start a new project](#0-start-a-new-project)
  - [1. Organizing your content](#1-organizing-your-content)
    - [1.1 External  links and hidden routes](#11-external--links-and-hidden-routes)
    - [1.2 Adding items to the navbar](#12-adding-items-to-the-navbar)
  - [2. Adding authentication](#2-adding-authentication)


# Why?

If you work building software,
you must have come across technical documentation at some point in your career.
Either be it an API reference or internal manuals,
technical documentation 
**is vital for the development process**.
Everyone expects it, 
but without it,
knowledge of the application becomes siloed 
within individuals which lead to inefficiencies 
in the whole development process.

To ensure long-term sustainability of your software projects,
having a clear and detailed record
of the `why`, `how` and `what`
helps maintain consistency 
and increases the quality of your work!

Whether it is meant as an internal reference 
or you're creating documentation for public-facing clients
that are using your project, 
having documentation benefits both the developers and users alike.


# What?

[`Nextra`](https://nextra.site/) is a framework
that makes it easy for you to create a documentation static website
fully optimized and powered by [`Next.js`](https://nextjs.org/).

It simpifies the process of creating and maintaining documentation
by offering a myriad of features, such as:
- themable design system.
- markdown support.
- full-text search out-of-the-box.
- automatic [`a11y`](https://www.a11yproject.com/).
- filesystem-based organization.

Its integration with `Next.js` means that it's fully customizable,
making it ideal for your team to quickly generate a website
that is useful for both internal and external documentation.


# Who?

This walkthrough is meant for beginners of the framework
but also seasoned software developers 
that want to create internal and external documentation for their teams.

This will **not be an introduction to technical writing**,
it will solely focus on the `Nextra` framework.
We recommend visiting https://developers.google.com/tech-writing/overview
if you are interested in learning more about technical writing.

If you find it useful, give the repo a star! ⭐️

If you get stuck, have questions/suggestions
or just want to discuss this further,
[do open an issue](https://github.com/dwyl/nextra-demo/issues)!


# How?

Are we ready to start? Let's go!

> [!TIP]
>
> Some of the information found in this document
> can also be found in the [`Nextra`'s offical docs](https://nextra.site/docs).
> We recommend going through their documentation 
> (it's not long) to better have a feeling over the framework.

When using `Nextra`, 
you first have to make a choice:
- you either use a *default theme*.
- you customize your own.

The vast majority of people will go for the former.
However, if you are looking to have a more customized look,
you may have to create your own theme.
[It's easier to start with a custom theme than using a default one and change it afterwards](https://github.com/shuding/nextra/issues/2926).

In our case, 
we'll start with the default theme and change it if needed.


## 0. Start a new project

Let's create our project.
We first need to install some dependencies.
We're going to use [`pnpm`](https://pnpm.io/)
throughout the project to manage dependencies.

```sh
pnpm add next react react-dom nextra nextra-theme-docs
```

This will create a `package.json` file
and install the dependencies under `node_modules`.

Now, let's add some scripts to `package.json` 
to be able to run our application.
Add the following:

```json
"scripts": {
  "dev": "next",
  "build": "next build",
  "start": "next start"
},
```

Your `package.json` will look something like this.

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

Next, we need to add a `Nextra` config file.
Because we're starting a project from scratch,
it has no idea it's a `Next.js` project.
Create a file called `next.config.js` and add the following.

```js
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
  defaultShowCopyCode: true
})
 
module.exports = withNextra()
```

Here we add global configurations to our project.
For example, we've added `defaultShowCopyCode: true`,
which will make it so code snippets
will have a copy button.

Lastly, we need to create
a corresponding `theme.config.jsx` file in your project’s root directory.
It will be used to configure our `Nextra`'s site theme.
We'll just add the basic ones.

> [!TIP]
>
> You can check the full theme configurations
> [in their documentation](https://nextra.site/docs/docs-theme/theme-configuration).

Now we're ready to bounce!
Because `Nextra` is a **file-based system framework**
(much like `Next.js`),
you will have to create all the documentation
under the `pages` folder.
Let's start create our first one under `pages/index.mdx`!

```mdx
# Welcome to our docs!
 
Hello, world!
```

> [!NOTE]
>
> [`mdx`](https://mdxjs.com/) files are markdown files
> that allow you to write `JSX` content.
> You can import components and embed them within your markdown files.

Let's see our handiwork.
Run `pnpm run dev` 
and visit `http://localhost:3000`.
You should see your page!

<p align="center">
  <img width='800' src="https://github.com/dwyl/learn-nextjs/assets/17494745/532ac0ca-312b-44cf-ac9a-a8801888ae55"/>
</p>

Congratulations!
You've just set up your documentation website!
Give yourself a pat on the back. 👏


## 1. Organizing your content

Now let's write some content!
We are going to organize our documentation
so it's easier to navigate.

In `Nextra`, 
the site and page structure can be configured via
[`_meta.json`](https://nextra.site/docs/guide/organize-files) files.
These files will affect the layout of the theme,
especially the sidebar/navigation bar.

For example, the title and order of a page shown in the sidebar
should be configured in the `_meta.json` file as key-value pairs.
Create the following structure in your project.

```
pages
|_ api_reference
    |_ _meta.json
    |_ about.mdx
|_ _meta.json
|_ about.mdx
|_ contact.mdx
|_ index.mdx
```

Define the pages in the top-level `_meta.json`, like so.

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
**to create _an hierarchy_** of pages, 
thus organizing them neatly.

If you want a folder to have their own page,
you can simply add a `.mdx` file
a level above, with the name of the folder.
Let's say we want `api_reference` to have an introductory page
when we click on it on the sidebar.
Simply create the file above the folder's level!

```
pages
|_ api_reference
    |_ _meta.json
    |_ about.mdx
|_ _meta.json
|_ about.mdx
|_ contact.mdx
|_ api_reference.mdx   // added this
|_ index.mdx
```

Alternatively, you can create an `index.mdx` file inside `api_reference`
to achieve a similar effect.


Now fill each `.mdx` with any content you want.
Run `pnpm run dev` and see your pages organized!

<p align="center">
  <img width='800' src="https://github.com/dwyl/learn-nextjs/assets/17494745/a1122331-3416-4232-b412-272cae84d9d6"/>
</p>


### 1.1 External  links and hidden routes

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
    "title": "Hello!",
    "type": "page"
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
  <img width='800' src="ttps://github.com/dwyl/learn-nextjs/assets/17494745/ce73b6d9-6890-4ee4-9635-354f88cbe887"/>
</p>

Awesome! 🎉

There are the basics on how to organize your content
inside your website!


## 2. Adding authentication

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


