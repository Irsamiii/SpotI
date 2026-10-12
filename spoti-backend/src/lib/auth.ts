import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";

const allowedDomain = process.env.ALLOWED_EMAIL_DOMAIN; // e.g. "school.edu"

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: { enabled: true },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          if (allowedDomain && !user.email.toLowerCase().endsWith(`@${allowedDomain}`)) {
            throw new APIError("BAD_REQUEST", {
              message: `Please sign up with your @${allowedDomain} email.`,
            });
          }
          return { data: user };
        },
      },
    },
  },
});