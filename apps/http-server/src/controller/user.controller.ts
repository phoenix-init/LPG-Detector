import { prisma } from "@repo/db";
import {Request, Response} from "express"

export const userController = async (req:Request, res:Response) => {
    
    const userId = res.locals.user;

    const userDetails = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            deviceAccess: {
                include: {
                    device: {
                        select: {
                            id: true,
                            serialNumber: true,
                            isOnline: true,
                            valveOpen: true,
                            powerSource: true,
                            maintenanceStatus: true,
                            name: true,
                            consecutiveLeakCount: true,
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
                    }
                }
            }
        }
    })

    const formatedResponse = {
        id: userDetails?.id,
        name: userDetails?.name,
        email: userDetails?.email,
        phoneNumber: userDetails?.phoneNumber,
        profilePicture: userDetails?.image,
        devices: userDetails?.deviceAccess.map((access) => ({
            id: access.device.id,
            serialNumber: access.device.serialNumber,
            isOnline: access.device.isOnline,
            valveOpen: access.device.valveOpen,
            powerSource: access.device.powerSource,
            maintenanceStatus: access.device.maintenanceStatus,
            name: access.device.name,
            readings: access.device.readings[0]
        }))
    }
    
    return res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: formatedResponse
    })
}

export const savePushToken = async (req:Request, res:Response) => {
    try {
        const userId = res.locals.user;
        const { token } = req.body;

        if(!token) {
            return res.status(400).json({
                success: false,
                message: "Token is required",
            })
        }

        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                expoPushToken: token
            }
        })

        return res.status(200).json({
            success: true,
            message: "Token saved successfully",
        })
        
    } catch (error) {
        console.error("Failed to save push token", error);
        return res.status(500).json({
            success: false,
            message: "Failed to save push token",
        })
    }
}