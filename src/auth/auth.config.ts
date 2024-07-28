import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.scope || "";
      const isOnSignInPage = nextUrl.pathname.includes("/login");
      const isOnSignUpPage = nextUrl.pathname.includes("/signup");
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnProfile = [
        "/account",
        "/account-billing",
        "/account-order",
        "/account-savelists",
        "/account-password"
      ].some(path => nextUrl.pathname.includes(path));
      const allowedRoles = [
        "administrator",
        "manager",
        "productionStaff",
        "warehouseStaff",
      ];

      if (isOnDashboard) {
        return isLoggedIn && allowedRoles.includes(role);
      } else if (isLoggedIn && (isOnSignInPage || isOnSignUpPage)) {
        return Response.redirect(new URL("/", nextUrl));
      } else if (!isLoggedIn && isOnProfile) {
        return Response.redirect(new URL("/login", nextUrl));
      } else if (isLoggedIn && allowedRoles.includes(role)) {
        return true;
      }
      return true;
    },
  },
  providers: [],
};
