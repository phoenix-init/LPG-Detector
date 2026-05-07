import "dotenv/config"
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth";
import { env } from "./validator/env";
import router from "./routes";

const app = express();

app.all(["/api/auth/*splat"], toNodeHandler(auth));

app.use(express.json());

app.use(cors({
    origin: true, // Allow all origins (reflects the request origin)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))


app.get("/api/health", (_, res) => {
    res.json({ status: "Express is running fast on Bun in the backend! 🦊" });
});

app.use("/api", router);


app.listen(8000, () => {
    console.log("Server is running on port 8000");
})