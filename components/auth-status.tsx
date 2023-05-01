import { useSession } from "next-auth/react";

export default function AuthStatus() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <div className="absolute top-5 w-full flex justify-center items-center">
      {session && (
        <p className="text-stone-200 text-sm">
          Signed in as {session.user?.email}
        </p>
      )}
    </div>
  );
}
