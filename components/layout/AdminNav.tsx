import Link from "next/link";

import styles from "./nav.module.css";

export default function AdminNav() {
  return (
    <nav>
      <ul className={styles.navItems}>
        <li className={styles.navItem}>
          <Link href="/admin/actualites">Actualités</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/admin/chevaux">Chevaux</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/admin/chevaux-a-vendre">Chevaux à vendre</Link>
        </li>
      </ul>
    </nav>
  );
}
