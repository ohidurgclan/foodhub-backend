import express, { Application, Request, Response } from "express";
import cors from "cors";
import mealRoutes from "./modules/meals/meal.routes";
import { authRouter } from "./modules/auth/auth.routes";
import seedRoutes from "./modules/seeds/seed.routes";
import orderRoutes from "./modules/orders/order.routes";
import auth, { UserRole } from "./middleware/auth";
import providerRoutes from "./modules/providers/provider.routes";

const app: Application = express();
app.use(cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true 
}))

app.use(express.json());
app.use('/api/auth', authRouter);
app.use("/api", mealRoutes);
app.use("/api", orderRoutes);
app.use("/api", providerRoutes);

app.use("/api/seed", seedRoutes);


app.get("/", (req:Request, res: Response) => {
    res.send("FoodHub Backend is running... Congratulations! Md Ohidur Rahman");
});

export default app;