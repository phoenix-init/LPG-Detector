import { Router } from "express";
import verifyPhoneRoute from "./phone-verify.route";

const router = Router();

router.use("/verify-phone", verifyPhoneRoute)

export default router;