import { env } from "@/validator/env";
import Redis from "ioredis";

const redisUrl = env.REDIS_URL;

const redis = new Redis(redisUrl);

redis.on("connect", () => {
    console.log("Redis is connected")
})

redis.on("error", () => {
    console.log("Redis is disconnected")
})

export default redis;