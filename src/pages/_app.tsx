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
