 import express, { Application } from "express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import { auth } from "./lib/auth";

const app: Application = express();
app.use(cors({
    origin: process.env.APP_URL || "http://localhost:3000", // allow to server to accept requests from this
    credentials: true // allow session cookie from browser to pass through
}))
app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(express.json());


app.get("/", (req, res) => {
    res.send("FoodHub Backend is running... Congratulations! Md Ohidur Rahman");
});

export default app;