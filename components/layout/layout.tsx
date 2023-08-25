import type { ReactNode } from "react";

import Header from "./header";
import Footer from "./footer";
import Nav from "./nav";
import AuthStatus from "../auth/auth-status";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
