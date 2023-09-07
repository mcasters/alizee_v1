import Link from "next/link";

import s from "./nav.module.css";
import React from "react";
import { Horse } from "@/interfaces/index";

interface NavProps {
  isHome: boolean;
}
export default function Nav({ isHome }: NavProps) {
  return (
    <nav className={isHome ? s.homeNav : s.nav}>
      <ul className={s.navItems}>
        <li className={s.navItem}>
          <Link href="/">Home</Link>
        </li>
        <li className={s.navItem}>
          <Link href="/actualites">Actualités</Link>
        </li>
        <li className={s.navItem}>
          <Link href="/chevaux">Chevaux</Link>
        </li>
        <li className={s.navItem}>
          <Link href="/chevaux-a-vendre">Chevaux à vendre</Link>
        </li>
      </ul>
    </nav>
  );
}
