import redis from "@/lib/redis";
import mobileValidatorSchema from "@/validator/mobile.validator";
import { prisma } from "@repo/db";
import { Request, Response } from "express";
import { z } from "zod";

const verifyPhoneController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { phoneNumber } = req.params;

        const parsedData = mobileValidatorSchema.safeParse({ phoneNumber });

        if (!parsedData.success) {
            const error = z.prettifyError(parsedData.error);
            res.status(400).json({ success: false, message: error });
            return;
        }

        const validatedPhoneNumber = parsedData.data.phoneNumber;

        const rateLimitKey = `rl:verify:${validatedPhoneNumber}`;
        const isRateLimited = await redis.get(rateLimitKey);

        if (isRateLimited) {
            res.status(429).json({ success: false, message: "Please wait 30 seconds before requesting again" });
            return;
        }

        await redis.set(rateLimitKey, "locked", "EX", 30);

        const cacheKey = `user:exists:${validatedPhoneNumber}`;
        const cachedUserStatus = await redis.get(cacheKey);

        if (cachedUserStatus) {
            const exists = cachedUserStatus === "true";
            const message = exists ? "Phone number is registered" : "Account not found";
            res.status(exists ? 200 : 404).json({ success: true, exists, message });
            return;
        }


        const isExist = await prisma.user.findUnique({
            where: { phoneNumber: validatedPhoneNumber },
            select: { id: true }
        });

        const existsBoolean = isExist ? "true" : "false";
        await redis.set(cacheKey, existsBoolean, "EX", 300); 


        if (isExist) {
            res.status(200).json({ success: true, exists: true, message: "Phone number is registered" });
            return;
        }

        res.status(404).json({ success: true, exists: false, message: "Account not found. Please sign up." });
        return;

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
        return;
    }
};

export default verifyPhoneController;