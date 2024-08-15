# Integrating `Plausible Analytics` into our `Nextra` site

Analytics are _essential_ for understanding how people interact with your website,
enabling you to make* data-driven decisions to improve performance*.
With analytics, you can track visitor behavior,
identify popular content,
discover where users drop off,
and see how they find your site.

Ultimately, this information is **crucial to optimize your site**
in your development cycle for increased engagement
and higher conversion rates.

We are going to be integrating [`Plausible Analytics`](https://plausible.io/)
in our `Nextra` site.

In this small guide,
we'll focus on providing you with a good start
to integrate `Plausible` with a `Nextra` app.
It builds on the [`tutorial.md`](./tutorial.md),
so make sure you went with that first.


## 1. Deploying `Nextra` to `Vercel`

We can't deploy our `Nextra` app to `Github Pages`
or any other static website hosts.
This is because we are using server components
that require a `Node.js` server
that cannot be computed during the build process.
See https://nextjs.org/docs/app/building-your-application/deploying/static-exports#unsupported-features
for more information.

Therefore,
we'll deploy our site to [**`Vercel`**](https://vercel.com/).
So make sure you've an account created.

Start by connecting your `Github` account.
You'll see the repositories
that you can import and deploy.

<p align="center">
  <img width='800' src="https://github.com/user-attachments/assets/2e9e170c-92e7-4c6a-8ad2-3f18ae6714be"/>
</p>

Click on `Import` on the desired project.

You will then be prompted to define some configurations.
Here you should import the `.env` variables
that you use to run the `Nextra` site on `localhost`.

<p align="center">
  <img width='45%' src="https://github.com/user-attachments/assets/678c5910-c737-4835-9b35-4a9d1ede2500"/>
  <img width='45%' src="https://github.com/user-attachments/assets/5217a62f-8bbb-4bf8-94ca-ba108845cfcb"/>
</p>

> [!NOTE]
>
> Make sure that your [`Github OAuth App`](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)
> has the correct callback for authentication.
> If you followed [`tutorial.md`](./tutorial.md),
> you may have set it to `http://localhost:3000` to run on `localhost`.
> But for this, you'll need to set it up to the hostname
> of the deployed site.
>
> You will get this information after deploying.


After setting the env variables,
click on `Deploy`.

<p align="center">
  <img width='45%' src="https://github.com/user-attachments/assets/c8250868-9a62-48d3-95f0-62b3acc2e412"/>
  <img width='45%' src="https://github.com/user-attachments/assets/4857bc20-4553-4b44-b4dc-26982d209e20"/>
</p>

Awesome!
Your site is now deployed!
If you check the dashboard of the deployed site,
you will see information and settings that you can tweak.

<p align="center">
  <img width='800' src="https://github.com/user-attachments/assets/6cd16639-7036-4338-9773-c57e7656950b"/>
</p>

Take note of the hostname.
Visit https://github.com/settings/developers
and change your existing `OAuth` application
*Authorization callback URL*
to match the hostname of the site we've deployed in `Vercel`.

<p align="center">
  <img width='800' src="https://github.com/user-attachments/assets/895498bc-0a7e-4a47-96c1-e7be7b9fb932"/>
</p>

> [!TIP]
>
> Alternatively, create a new `OAuth` application
> and change the env variables in 
> so `next-auth` still works in your `localhost`.
>
> To change these env variables,
> go to the deployed site dashboard in `Vercel`,
> head over to `Settings` and click on `Environment Variables`.
> You can then update the env variable values
> with your newly created `OAuth` application.
>
> <p align="center">
>   <img width='800' src="https://github.com/user-attachments/assets/246e894f-f6cd-46cb-82bc-866da67b55dc"/>
> </p>

All this effort is just to make `auth` work on the app.
It doesn't necessarily need to be properly set up
for `Plausible` to work,
but we want all our `Nextra` app to be fully functional online 🙂.


## 2. Integrating `Plausible Analytics` in our `Nextra` app

Now let's get into the fun part!

To provide more context,
we've deployed an instance of
https://github.com/plausible/analytics
to https://analytics.dwyl.com.
We have our own self-hosted `Plausible CE`
instance running in this domain.
If you're interested in learning more about
how to self-host your own instance,
head over to https://github.com/dwyl/learn-analytics.

> [!IMPORTANT]
>
> In this section,
> we'll speed run the integration of `Plausible` in our site,
> so details will be purposely omitted to expedite this process.
>
> If you want a more in-depth, step-by-step process,
> check https://github.com/dwyl/learn-analytics/tree/main/plausible#3-optional-monitoring-a-nextjs-website out.


We're going to install https://github.com/4lejandrito/next-plausible
to connect to our `Plausible` instance.
This library makes it easy for us to integrate
and create custom events to send over to our self-hosted `Plausible` server.

Install it by running:

```sh
pnpm add next-plausible -w
```

Now, we need to wrap our app with `<PlausibleProvider>`,
at the top level of our application.
This is made inside `/src/pages/_app.tsx`.

```tsx
// These styles apply to every route in the application
import "@/src/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import PlausibleProvider from "next-plausible";

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <PlausibleProvider domain="nextra-demo-seven.vercel.app" customDomain="https://analytics.dwyl.com" selfHosted>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </PlausibleProvider>
  );
}
```

As you can see, `<PlausibleProvider>` has a few properties that we need to set.
You can find the full list in https://github.com/4lejandrito/next-plausible#plausibleprovider-props.
- **`domain`** is the domain of the site we want to monitor.
It should be the same name of the site we've defined
when we set up our `Plausible` server
and is the same domain where our `Nextra` site is deployed;

- **`selfHosted`** has to be set to `true` if we're self-hosting `Plausible`.
Otherwise, we'll get a `404` when the website we're monitoring
requests the analytics script.

- **`customDomain`** is the custom domain where the `Plausible` analytics script
(that the browser page downloads so our `Plausible` instance can gather analytics)
is being served.
This must be defined in self-hosted applications.
It's the domain of where our `Plausible CE` instance is deployed.

And that's it!
We've integrated `Plausible` with our app!

When we visit our `Plausible` instance,
we'll see our visitors being shown!

<p align="center">
  <img width='800' src="https://github.com/user-attachments/assets/be516048-0eb3-4099-9f31-80e7313c2a6c"/>
</p>

> [!NOTE]
>
> In the picture above,
> we're testing on `localhost`,
> so we tweaked the configuration of the `<PlausibleProvider>` for it to work on `localhost`.
>
> This is just to inform you that when you're deploying,
> you should stick to what's been mentioned above 😊.


## 3. What's more...?

We've just *scratched the surface* when it comes to `Plausible` with `Nextra`/`Next.js`!
We've documented *more* features of `next-plausible` in
https://github.com/dwyl/learn-analytics/tree/main/plausible#3-optional-monitoring-a-nextjs-website
where you can learn about **custom events** and **proxying the analytics script served by your `Plausible` server**.

We urge you to check it out to continue on your journey!