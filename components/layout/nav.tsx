import Link from "next/link";

import styles from "./header.module.css";

export default function Nav() {
  return (
    <nav>
      <ul className={styles.navItems}>
        <li className={styles.navItem}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/presentation">Présentation</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/actualites">Actualités</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/chevaux">Chevaux</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/chevaux-a-vendre">Chevaux à vendre</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/admin">Admin</Link>
        </li>
      </ul>
    </nav>
  );
}
