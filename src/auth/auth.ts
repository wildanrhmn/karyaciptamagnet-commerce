import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import NextAuth from 'next-auth';
import { env } from "@/lib/env";
import { authConfig } from './auth.config';
import { prisma } from '@/lib/db/prisma';
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
        const existingUser = await prisma.user.findUnique({
          where: {
            email: user?.email ?? undefined
          }
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user?.email,
              name: user?.name,
              image: JSON.stringify({url: user?.image, public_id: ''}),
              emailVerified: new Date()
            }
          });
        } else if (existingUser) {
          const updateData: { name?: string; image?: string; emailVerified?: Date } = {};
          
          if (!existingUser.name) {
            updateData.name = user?.name!;
          }

          if (!existingUser.emailVerified) {
            updateData.emailVerified = new Date()
          }
          
          if (!existingUser.image) {
            updateData.image = JSON.stringify({url: user?.image, public_id: ''});
          }
          
          if (Object.keys(updateData).length > 0) {
            await prisma.user.update({
              where: {
                email: user?.email!
              },
              data: updateData
            });
          }
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session) {
        token = {...token, user : session}
        return token;
      };
      return { ...token, ...user };

    },
    async session({ session, token }) {
      if (token.user) {
        session.user = { ...session.user, ...token.user };
      }
      session.user.id = token.sub;
      session.user.username = token.username;
      session.user.scope = token.scope;
      session.user.image = token.image ? JSON.parse(token.image as string) : null;
      return session;
    },
  },
});