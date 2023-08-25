import Link from "next/link";
import s from "./Contact.module.css";

export default function Contact() {
  return (
    <address className={s.contactContainer}>
      <h1>
        <strong>Contact</strong>
      </h1>
      <span>
        <strong>Alizée Roussel</strong>
      </span>

      <br />
      <span>La tardivière - 49140 CORZÉ</span>
      <br />
      <br />
      <span>+33 (0)6 08 15 71 07</span>
      <br />
      <Link href="mailto:contact@alizeeroussel.fr">
        contact@alizeeroussel.fr
      </Link>
    </address>
  );
}
