import express, { Application, Request, Response } from "express";
import cors from "cors";
import mealRoutes from "./modules/meals/meal.routes";
import { authRouter } from "./modules/auth/auth.route";
import seedRoutes from "./modules/seeds/seed.routes";
import orderRoutes from "./modules/orders/order.routes";
import auth, { UserRole } from "./middleware/auth";
import providerRoutes from "./modules/providers/provider.routes";

UserRole

const app: Application = express();
app.use(cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true 
}))

app.use(express.json());
app.use('/api/auth', authRouter);
app.use("/api",auth(UserRole.CUSTOMER), mealRoutes);
app.use("/api", auth(UserRole.CUSTOMER), orderRoutes);
app.use("/api", auth(UserRole.PROVIDER), providerRoutes);

app.use("/api/seed", seedRoutes);


app.get("/", (req:Request, res: Response) => {
    res.send("FoodHub Backend is running... Congratulations! Md Ohidur Rahman");
});

export default app;