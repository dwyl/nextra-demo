import { signOut, signIn } from "next-auth/react";
import { DefaultSession } from "next-auth";

export default function LoginOrUserInfo({ session } : Readonly<{session: DefaultSession}>) {
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
    return <button onClick={() => signIn()} 
    className="nx-bg-blue-500 hover:nx-bg-blue-700 nx-text-white py-2 px-4 nx-rounded">
    SIGN IN</button>;
  }
}
