import NextAuth from 'next-auth';
import { ImageUrl } from './definition';

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      scope: string;
      image: ImageUrl;
    } & DefaultSession["user"];
  }
}
