import type { ReactNode } from "react";
import { useRef, useEffect } from "react";

import Header from "./header";
import Footer from "./footer";
import s from "./layout.module.css";
import { useRouter } from "next/router";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const isHome = router.pathname === "/";

  return (
    <>
      {!isHome && <div className={s.line}></div>}
      <Header isHome={isHome} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
