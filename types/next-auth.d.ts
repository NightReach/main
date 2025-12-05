import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string | number;
    role: string;
  }

  interface Session {
    user: {
      id: string | number;
      role: string;
      name?: string | null;
      email?: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string | number;
    role: string;
    name?: string | null;
    email?: string | null;
  }
}
