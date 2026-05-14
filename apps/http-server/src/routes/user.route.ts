import { savePushToken, userController } from "@/controller/user.controller";
import { Router } from "express";
import authMiddleware from "@/middleware/auth.middleware";

const userRoute = Router();

userRoute.get("/me", authMiddleware, userController)

userRoute.post("/push-token", authMiddleware, savePushToken)

export default userRoute;
