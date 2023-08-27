import { ReactNode } from "react";
import s from "./header.module.css";

export default function Header({ children }: { children: ReactNode }) {
  return (
    <header className={s.container}>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      {children}
    </header>
  );
}
