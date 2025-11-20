import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultSession["user"] & {
      id: string;
      role: "USER" | "ADMIN";
      referralCode?: string;
    };
  }

  interface User {
    role: "USER" | "ADMIN";
    referralCode?: string | null;
  }
}


