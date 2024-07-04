import GitHub from "next-auth/providers/github";
import NextAuth, { type DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import { AdapterSession } from "next-auth/adapters";
import { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import { ExtendedUser } from './types';

// We need to add the role to the JWT inside `NextAuth` below, so the `middleware.ts` can have access to it.
// The problem is that it wasn't adding this `role` custom field, even if we defined it in `auth.ts`.
// Apparently, the problem is with the types of `next-auth`, which we need to redefine.
// See https://stackoverflow.com/questions/74425533/property-role-does-not-exist-on-type-user-adapteruser-in-nextauth
// and see https://authjs.dev/getting-started/typescript#module-augmentation.

declare module "next-auth" {
  interface Session extends DefaultSession {
    /**
     * By default, TypeScript merges new interface properties and overwrites existing ones.
     * In this case, the default session user properties will be overwritten,
     * with the new ones defined above. To keep the default session user properties,
     * we need to add them back into the newly declared interface.
     */
    user: ExtendedUser
  }

  interface User {
    // Additional properties here:
    role?: string;
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    // Additional properties here:
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}

// ----------

// OAuth providers to sign-in
const providers: Provider[] = [
  GitHub({
    profile(profile) {
      // GitHub's OAuth apps don't allow you to define roles.
      // So `profile` here doesn't have a `role` property.
      // But on other providers, you'd add the role here through it.
      return {
        id: profile.id.toString(),
        name: profile.name ?? profile.login,
        email: profile.email,
        image: profile.avatar_url,
        role: "user",
      };
    },
  }),
];

// Be sure to not put a development version in production!
// See https://authjs.dev/guides/testing#credentials-provider-in-development.
if (process.env.NODE_ENV === "development") {
  providers.push(
    Credentials({
      id: "password",
      name: "Password",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      authorize: (credentials) => {
        if (credentials.password === process.env.TEST_PASSWORD) {
          return {
            email: "bob@alice.com",
            name: "Bob Alice",
            image: "",
          };
        }
        return null;
      },
    })
  );
}

// The important part: where the `NextAuth` config is exported
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: providers,
  callbacks: {
    jwt({ token, user, account, profile }) {
      // Normally, it would be like this
      // if(user) return {...token, role: token.role}
      // return token

      // But because Github's provider is not passing the role
      // (it should, according to https://authjs.dev/guides/role-based-access-control#with-jwt -
      // maybe it's because v5 is still in beta), we're just gonna append it every time
      return { ...token, role: "another_role" };
    },
    session({ session, token }) {
      session.user.role = token.role
      return session;
    },
  },
});
