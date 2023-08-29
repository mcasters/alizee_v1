import Link from "next/link";

import s from "./AdminNav.module.css";

export default function AdminNav() {
  return (
    <nav className={s.nav}>
      <ul className={s.navItems}>
        <li className={s.navItem}>
          <Link href="/admin/actualites">Actualités</Link>
        </li>
        <li className={s.navItem}>
          <Link href="/admin/chevaux">Chevaux</Link>
        </li>
        <li className={s.navItem}>
          <Link href="/admin/chevaux-a-vendre">Chevaux à vendre</Link>
        </li>
      </ul>
    </nav>
  );
}
