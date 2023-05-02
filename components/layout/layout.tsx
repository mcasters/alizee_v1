import type { ReactNode } from "react";

import Header from "./header";
import Footer from "./footer";
import Nav from "./nav";
import AuthStatus from "@/components/auth/auth-status";

export default function Layout({ children }: { children: ReactNode }) {
  const AuthStatusDiv = AuthStatus();
  return (
    <>
      <Header />
      <Nav />
      {AuthStatusDiv}
      <main>{children}</main>
      <Footer />
    </>
  );
}
