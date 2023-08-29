import { ReactNode, useEffect, useRef } from "react";
import s from "./header.module.css";
import Nav from "@/components/layout/nav";
import Image from "next/image";

interface HeaderProps {
  isHome: boolean;
}

export default function Header({ isHome }: HeaderProps) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.6;
  }, []);

  return isHome ? (
    <header className={s.homeContainer}>
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
        <Image
          width={120}
          height={120}
          src="/logo-transparent-670.png"
          alt="Alizée Roussel Dressage"
        />
        <Nav isHome={true} />
      </div>
    </header>
  ) : (
    <header className={s.container}>
      <Nav isHome={false} />
    </header>
  );
}
