import { prisma } from "@repo/db";
import { Request, Response } from "express";


const getDeviceStatus = async (req: Request, res: Response) => {
    try {
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

        const readings = await prisma.ioTDevice.findUnique({
            where: {
                serialNumber: serialNumber
            },
            select: {
                isOnline: true,
                valveOpen: true,
                powerSource: true,
                maintenanceStatus: true,
                consecutiveLeakCount: true,
                name: true,
                readings: {
                    take: 1,
                    orderBy: {
                        timestamp: "desc"
                    },
                    select: {
                        isLeaking: true
                    }
                }
            }
        })

        const latestReading = {
            serialNumber,
            isLeaking: readings?.readings[0]?.isLeaking,
            isOnline: readings?.isOnline,
            valveOpen: readings?.valveOpen,
            powerSource: readings?.powerSource,
            consecutiveLeakCount: readings?.consecutiveLeakCount,
            maintenanceStatus: readings?.maintenanceStatus,
            name: readings?.name
        }    
     
        res.json({
            success: true,
            message: "Device status fetched successfully",
            data: latestReading
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export default getDeviceStatus;