import { prisma } from "@repo/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { env } from "./validator/env";
import { phoneNumber } from "better-auth/plugins";
import { expo } from "@better-auth/expo";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    expo(),
    phoneNumber({
      sendOTP: async ({ phoneNumber, code }, ctx) => {
        console.log("Send OTP Code:", code, "to", phoneNumber);
      },
      signUpOnVerification: {
        getTempEmail: (phoneNumber) => `${phoneNumber.replace('+', '')}@gas-sense.local`,
      }
    })
  ],
  trustedOrigins: [
    "gas-sense://",
    ...(env.NODE_ENV === "development" ? [
        "exp://",                      // Trust all Expo URLs (prefix matching)
        "exp://**",                    // Trust all Expo URLs (wildcard matching)
        "exp://192.168.*.*:*/**",      // Trust 192.168.x.x IP range with any port and path
    ] : [])
  ]
});