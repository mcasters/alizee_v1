import Link from "next/link";

import Contact from "@/components/Contact";
import s from "./footer.module.css";
import AuthStatus from "@/components/auth/auth-status";
import Image from "next/image";

export default function Footer() {
  const AuthStatusDiv = AuthStatus();
  const ContactDiv = Contact();

  return (
    <footer className={s.footer}>
      <div className={s.leftPart}>{AuthStatusDiv}</div>
      <div className={s.middlePart}>
        <ul className={s.navItems}>
          <li className={s.logo}>
            <Link href="/home">
              <Image
                width={100}
                height={100}
                src="/logo-transparent-670.png"
                alt="Alizée Roussel Dressage"
                className="w-36 h-36"
              />
            </Link>
          </li>
          <li className={s.navItem}>
            <Link href="/policy">Policy</Link>
          </li>
          <li className={s.navItem}>
            <Link href="/admin">Administration du site</Link>
          </li>
        </ul>
      </div>
      <div className={s.rightPart}>{ContactDiv}</div>
    </footer>
  );
}
