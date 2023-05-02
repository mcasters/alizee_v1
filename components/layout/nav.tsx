import Link from "next/link";
import styles from "./header.module.css";

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  return (
    <nav>
      <ul className={styles.navItems}>
        <li className={styles.navItem}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/admin">Admin</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/actualites">Actualités</Link>
        </li>
      </ul>
    </nav>
  );
}
