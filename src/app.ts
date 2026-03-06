import express, { Application, Request, Response } from "express";
import cors from "cors";
import mealRoutes from "./modules/meals/meal.routes";
import { authRouter } from "./modules/auth/auth.route";
import seedRoutes from "./modules/seeds/seed.routes";

const app: Application = express();
app.use(cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true 
}))

app.use(express.json());
app.use('/api/auth', authRouter);
app.use("/api", mealRoutes);
app.use("/api/seeds", seedRoutes);


app.get("/", (req:Request, res: Response) => {
    res.send("FoodHub Backend is running... Congratulations! Md Ohidur Rahman");
});

export default app;