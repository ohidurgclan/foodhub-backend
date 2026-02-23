 import express, { Application, Request, Response } from "express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import { auth } from "./lib/auth";
import { authRouter } from "./modules/auth/auth.route";

const app: Application = express();
app.use(cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true 
}))


app.use(express.json());
app.use('/api/auth', authRouter);
app.get("/", (req:Request, res: Response) => {
    res.send("FoodHub Backend is running... Congratulations! Md Ohidur Rahman");
});

export default app;