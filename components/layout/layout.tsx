import type { ReactNode } from "react";

import Header from "./header";
import Footer from "./footer";
import s from "./layout.module.css";
import { useRouter } from "next/router";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const path = router.pathname;
  const isHome = path === "/";
  const isFullWidth = path.split("/")[1] !== "admin";

  return (
    <>
      {!isHome && <div className={s.line}></div>}
      <Header isHome={isHome} />
      {!isFullWidth && (
        <main className={s.mainWithMarge}>
          <div className={s.wrapper}>{children}</div>
        </main>
      )}
      {isFullWidth && <main>{children}</main>}
      <Footer />
    </>
  );
}
