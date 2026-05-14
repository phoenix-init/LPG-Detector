import { Router } from "express";
import verifyPhoneRoute from "./phone-verify.route";
import userRoute from "./user.route";
import deviceRoute from "./device.route";
import valveRoute from "./valve.route";

const router = Router();

router.use("/verify-phone", verifyPhoneRoute)

router.use("/users", userRoute)

router.use("/devices", deviceRoute)

router.use("/valve", valveRoute)

export default router;