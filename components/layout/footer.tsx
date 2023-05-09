import Link from "next/link";
import styles from "./footer.module.css";
import packageJSON from "../../package.json";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Footer() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <footer className={styles.footer}>
      <hr />
      <ul className={styles.navItems}>
        <li className={styles.navItem}>
          <div className={styles.signedInStatus}>
            <p
              className={`nojs-show ${
                !session && loading ? styles.loading : styles.loaded
              }`}
            >
              {!session && (
                <>
                  <span className={styles.notSignedInText}>
                    <small>You are not signed in</small>
                  </span>
                  <br />
                  <Link href="/pages/admin" prefetch={false}>
                    Admin in
                  </Link>
                </>
              )}
              {session?.user && (
                <>
                  {session.user.image && (
                    <span
                      style={{
                        backgroundImage: `url('${session.user.image}')`,
                      }}
                      className={styles.avatar}
                    />
                  )}
                  <span className={styles.signedInText}>
                    <small>Signed in as</small>
                    <br />
                    <strong>{session.user.email ?? session.user.name}</strong>
                  </span>
                  <a
                    // href={`/api/auth/signout`}
                    className={styles.button}
                    onClick={(e) => {
                      e.preventDefault();
                      signOut();
                    }}
                  >
                    Admin out
                  </a>
                </>
              )}
            </p>
          </div>
        </li>
        <li className={styles.navItem}>
          <Link href="/policy">Policy</Link>
        </li>
      </ul>
    </footer>
  );
}
