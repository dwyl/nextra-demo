import { signOut, signIn } from "next-auth/react";
import { Session } from "next-auth";

export function LoginOrUserInfo({ session } : Readonly<{session: Session}>) {
  if (session?.user) {
    return (
      <div>
        <span>
          Welcome <b>{session.user.name}</b>
        </span>{" "}
        <br />
        <button onClick={() => signOut()}>SIGN OUT</button>
      </div>
    );
  } else {
    return <button onClick={() => signIn()}>SIGN IN</button>;
  }
}
