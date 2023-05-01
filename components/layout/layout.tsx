import type { ReactNode } from "react";

import Header from "./header";
import Footer from "./footer";
import AuthStatus from "@/components/auth-status";

export default function Layout({ children }: { children: ReactNode }) {
  const AuthStatusDiv = AuthStatus();
  return (
    <>
      <Header />
      {AuthStatusDiv}
      <main>{children}</main>
      <Footer />
    </>
  );
}
