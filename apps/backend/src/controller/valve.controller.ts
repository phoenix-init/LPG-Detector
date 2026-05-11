import { mqttClient } from "@/lib/mqtt";
import valveSchema from "@/validator/valve.validator";
import { prisma } from "@repo/db";
import { Request, Response } from "express";
import redis from "@/lib/redis";

export const valveController = async (req: Request, res: Response): Promise<any> => {
    try {
        const user = res.locals.user;
        const { serialNumber } = req.params;
        const { valveOpen } = req.body;

        const validateValveInput = valveSchema.safeParse({ serialNumber, valveOpen });

        if(!validateValveInput.success){
            return res.status(400).json({ success: false, message: "Invalid data" });
        }

        const parsedData = validateValveInput.data;

        let device;
        const cachedDevice = await redis.get(`device:${parsedData.serialNumber}`);

        if (cachedDevice) {
            device = JSON.parse(cachedDevice);
        } else {
            device = await prisma.ioTDevice.findUnique({
                where: { serialNumber: parsedData.serialNumber },
                include: {
                    users: {
                        where: { userId: user.id } 
                    }
                }
            });

            if (device) {
                await redis.set(`device:${parsedData.serialNumber}`, JSON.stringify(device), "EX", 60 * 60 * 24 * 7);
            }
        }

        if (!device) {
            return res.status(404).json({ success: false, message: "Device not found" });
        }

        if (device.deviceAccess && device.deviceAccess.length === 0) {
            return res.status(403).json({ success: false, message: "Unauthorized to control this device" });
        }

        if (!device.isOnline) {
            return res.status(400).json({ success: false, message: "Device is offline" });
        }

        mqttClient.publish("gasSystem/control", JSON.stringify({ valveOpen: parsedData.valveOpen }));

        await prisma.ioTDevice.update({
            where: { serialNumber: parsedData.serialNumber },
            data: { valveOpen: parsedData.valveOpen }
        });

        return res.status(200).json({
            success: true,
            message: "Valve updated successfully",
            data: { serialNumber: parsedData.serialNumber, valveOpen: parsedData.valveOpen }
        });
    } catch (error) {
        console.error("Error updating valve:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}