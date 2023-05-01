import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

import type { AppProps } from "next/app";
// @ts-ignore
import type { Session } from "next-auth";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <Toaster />
    </SessionProvider>
  );
}
