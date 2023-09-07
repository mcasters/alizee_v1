import type { ReactNode } from "react";

import Header from "./header";
import Footer from "./footer";
import s from "./layout.module.css";
import { useRouter } from "next/router";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const path = router.pathname;
  const rootPath = path.split("/")[1];
  const isHome = rootPath === "";
  const fullWidth =
    isHome || rootPath === "chevaux" || rootPath === "chevaux-a-vendre";

  return (
    <>
      {!isHome && <div className={s.line}></div>}
      <Header isHome={isHome} />
      {!fullWidth && (
        <main className={s.mainWithMarge}>
          <div className={s.wrapper}>{children}</div>
        </main>
      )}
      {fullWidth && <main>{children}</main>}
      <Footer />
    </>
  );
}
