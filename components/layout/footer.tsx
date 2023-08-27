import Link from "next/link";

import Contact from "@/components/Contact";
import s from "./footer.module.css";
import AuthStatus from "@/components/auth/auth-status";
import Image from "next/image";

export default function Footer() {
  const AuthStatusDiv = AuthStatus();
  const ContactDiv = Contact();

  return (
    <>
      <div className={s.line}></div>
      <footer className={s.footer}>
        <div className={s.leftPart}>
          {AuthStatusDiv}
          <ul className={s.navItems}>
            <li className={s.navItem}>
              <Link href="/admin">Administration du site</Link>
            </li>
            <li className={s.navItem}>
              <Link href="/policy">Policy</Link>
            </li>
          </ul>
        </div>
        <div className={s.middlePart}>
          <Link href="/">
            <Image
              width={180}
              height={180}
              src="/logo-transparent-670.png"
              alt="Alizée Roussel Dressage"
              className="w-36 h-36"
            />
          </Link>
        </div>
        <div className={s.rightPart}>{ContactDiv}</div>
      </footer>
    </>
  );
}
