import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnSignInPage = nextUrl.pathname.includes("/login");
      const isOnSignUpPage = nextUrl.pathname.includes("/signup");
      const isOnProfile = [
        "/account",
        "/account-billing",
        "/account-order",
        "/account-savelists",
        "/account-password"
      ].some(path => nextUrl.pathname.includes(path));
    if (isLoggedIn && (isOnSignInPage || isOnSignUpPage)) {
        return Response.redirect(new URL("/", nextUrl));
      } else if (!isLoggedIn && isOnProfile) {
        return Response.redirect(new URL("/login", nextUrl));
      }
      return true;
    },
  },
  providers: [],
};
