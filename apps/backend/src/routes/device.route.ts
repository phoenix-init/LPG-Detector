import { Router } from "express";
import authMiddleware from "@/middleware/auth.middleware";
import getDeviceStatus from "@/controller/device.controller";

const deviceRoute = Router();

deviceRoute.get("/:serialNumber/status", authMiddleware, getDeviceStatus);

export default deviceRoute;