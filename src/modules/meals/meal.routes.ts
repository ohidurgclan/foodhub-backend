import { Router } from "express";
import { MealController } from "./meal.controller";


const router = Router();

router.get("/meals", MealController.getMeals);
router.get("/meals/:id", MealController.getMealDetails);
router.get("/providers", MealController.getProviders);
router.get("/providers/:id", MealController.getProviderDetails);

export default router;