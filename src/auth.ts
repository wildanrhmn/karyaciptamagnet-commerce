import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import NextAuth from 'next-auth';
import { env } from "@/lib/env";
import { authConfig } from './auth.config';
import { prisma } from '@/lib/db/prisma';
import { mergeAnonymousCartIntoUserCart } from "@/lib/db/cart";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { Adapter } from "next-auth/adapters";
import bcrypt from 'bcrypt';

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma as PrismaClient) as Adapter,
  ...authConfig,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        }
        const user: any = await prisma.user.findUnique({
          where: {
            email
          }
        })
        if (!user) return null;

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) return user;

        return null;
      },
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === 'google') {
        if (user?.email && !user?.image) {
          await prisma.user.update({
            where: {
              email: user?.email
            },
            data: {
              image: JSON.stringify({url: profile?.image, public_id: ''})
            }
          })
        }
      }
      return true
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.scope = token.scope
      session.user.image = JSON.parse(token.image as string) 
      return session;
    }
  },
  events: {
    async signIn({ user }: { user: any }) {
      await mergeAnonymousCartIntoUserCart(user.id);
    },
  }
});