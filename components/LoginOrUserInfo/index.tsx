import Link from "next/link";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

export function LoginOrUserInfo({ session } : Readonly<{session: Session}>) {
  if (session?.user) {
    return (
      <div>
        <span>
          Welcome <b>{session.user.name}</b>
        </span>{" "}
        <br />
        <button onClick={() => signOut()}>Signout</button>
      </div>
    );
  } else {
    return <Link href="/api/auth/signin">LOGIN</Link>;
  }
}
