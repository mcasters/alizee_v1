import { signIn, signOut, useSession } from "next-auth/react";
import LoadingDots from "@/components/loading-dots";
import s from "./authStatus.module.css";

export default function AuthStatus() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  if (loading) return <LoadingDots />;

  return (
    <div className={s.authContainer}>
      {!session && (
        <>
          <span>
            <small>You are not signed in</small>
          </span>
          <br />
          <button
            className="buttonLink"
            onClick={() => {
              signIn();
            }}
          >
            Admin in
          </button>
        </>
      )}
      {session?.user && (
        <>
          <span>
            <small>Signed in as</small>
            <br />
            <strong>{session.user.email}</strong>
          </span>
          <br />
          <button
            className="buttonLink"
            onClick={() => {
              signOut();
            }}
          >
            Admin out
          </button>
        </>
      )}
    </div>
  );
}
