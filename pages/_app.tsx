import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

import type { AppProps } from "next/app";
import type { Session } from "next-auth/index";

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
