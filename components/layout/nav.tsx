import Link from "next/link";

import s from "./header.module.css";

export default function Nav() {
  return (
    <nav>
      <ul className={s.navItems}>
        <li className={s.navItem}>
          <Link href="/">Home</Link>
        </li>
        <li className={s.navItem}>
          <Link href="/presentation">Présentation</Link>
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
