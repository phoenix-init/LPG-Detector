import verifyPhoneController from "@/controller/phone-verify.controller";
import { Router } from "express";

const verifyPhone = Router();

verifyPhone.get("/:phoneNumber", verifyPhoneController)

export default verifyPhone