import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.scope || "";
      const isOnSignPage = nextUrl.pathname.startsWith('/auth');
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const adminRole = ['administrator', 'manager', 'marketing'];
      if (isOnDashboard) {
        if (isLoggedIn && adminRole.includes(role)) return true;
        return false;
      } else if (isLoggedIn && isOnSignPage) {
        return Response.redirect(new URL('/store', nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
