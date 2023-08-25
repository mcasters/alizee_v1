import s from "./footer.module.css";
import AuthStatus from "@/components/auth/auth-status";
import Link from "next/link";

export default function Footer() {
  const AuthStatusDiv = AuthStatus();

  return (
    <footer className={s.footer}>
      {AuthStatusDiv}
      <ul className={s.navItems}>
        <li className={s.navItem}>
          <Link href="/policy">Policy</Link>
        </li>
        <li className={s.navItem}>
          <Link href="/admin">Administration du site</Link>
        </li>
      </ul>
    </footer>
  );
}
