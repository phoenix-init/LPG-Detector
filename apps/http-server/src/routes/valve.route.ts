import { valveController } from "@/controller/valve.controller";
import authMiddleware from "@/middleware/auth.middleware";
import { Router } from "express";

const valveRoute = Router();

valveRoute.post("/:serialNumber/update", authMiddleware, valveController)

export default valveRoute;