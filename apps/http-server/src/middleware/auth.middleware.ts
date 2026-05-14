import { NextFunction, Request, Response } from "express";
import { auth } from "@/auth";
import { fromNodeHeaders } from "better-auth/node";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers)
        })

        if(!session) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        res.locals.user = session.user.id; 

        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export default authMiddleware;