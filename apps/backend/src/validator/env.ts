import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string(),
    BETTER_AUTH_URL: z.url() || z.httpUrl(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    NODE_ENV: z.enum(["development", "production", "test"]),
    REDIS_URL: z.string()
})

const parsedData = envSchema.safeParse(process.env);

if (!parsedData.success) {
    throw new Error("Invalid environment variables");
}

const env = parsedData.data;

export { env };