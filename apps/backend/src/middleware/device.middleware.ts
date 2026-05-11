import { prisma } from "@repo/db";
import { NextFunction, Request, Response } from "express";

const deviceMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const serialNumber = req.params.serialNumber as string;

    const isExist = await prisma.ioTDevice.findUnique({
        where: {
            serialNumber: serialNumber
        }
    })

    if (!isExist) {
        return res.status(404).json({
            success: false,
            message: "Device not found",
            data: serialNumber
        })
    }

    next();
}

export default deviceMiddleware;