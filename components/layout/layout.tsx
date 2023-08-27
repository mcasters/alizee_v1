import type { ReactNode } from "react";
import { useRef, useEffect } from "react";

import Header from "./header";
import Footer from "./footer";
import Nav from "./nav";
import s from "./layout.module.css";
import { useRouter } from "next/router";

export default function Layout({ children }: { children: ReactNode }) {
  const videoRef = useRef(null);
  const router = useRouter();
  const isHome = router.pathname === "/";

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.6;
  }, []);

  return isHome ? (
    <div className={s.homeContainer}>
      <div className={s.overlay}></div>
      <video
        ref={videoRef}
        className={s.videoBg}
        src="/test.mov"
        autoPlay
        loop
        muted
      />
      <div className={s.homeContent}>
        <main className={s.homeMain}>{children}</main>
        <Nav isHome={true} />
      </div>
      <Footer />
    </div>
  ) : (
    <>
      <div className={s.line}></div>
      <Header>
        <Nav isHome={false} />
      </Header>
      <main className={s.main}>{children}</main>
      <Footer />
    </>
  );
}
