import type { ReactNode } from "react";
import { useRef, useEffect } from "react";

import Header from "./header";
import Footer from "./footer";
import Nav from "./nav";
import s from "./layout.module.css";

export default function Layout({ children }: { children: ReactNode }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.6;
  }, []);

  return (
    <div className={s.main}>
      <div className={s.overlay}></div>
      <video
        ref={videoRef}
        className={s.videoBg}
        src="/test.mov"
        autoPlay
        loop
        muted
      />
      <div className={s.content}>
        <Header />
        <Nav />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
