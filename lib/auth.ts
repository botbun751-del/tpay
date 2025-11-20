import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { env } from "@/lib/env";
import { loginSchema } from "@/lib/validators/auth";
import { verifyPassword } from "@/utils/password";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
  },
  trustHost: true,
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    Facebook({
      clientId: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
    }),
    Credentials({
      authorize: async (credentials) => {
        const result = loginSchema.safeParse(credentials);
        if (!result.success) {
          return null;
        }

        const { email, password } = result.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.passwordHash) {
          return null;
        }

        const isValid = await verifyPassword(password, user.passwordHash);
        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (!session.user) {
        return session;
      }

      const enrichedUser =
        user ??
        (session.user.email
          ? await prisma.user.findUnique({
              where: { email: session.user.email },
              select: { id: true, role: true, referralCode: true },
            })
          : null);

      if (enrichedUser) {
        session.user.id = enrichedUser.id;
        session.user.role = enrichedUser.role as "USER" | "ADMIN";
        session.user.referralCode = enrichedUser.referralCode ?? undefined;
      }

      return session;
    },
  },
});

