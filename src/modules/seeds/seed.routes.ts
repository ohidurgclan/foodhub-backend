import { Router } from "express";
import { seedController } from "./seed.controllers";

const router = Router();
router.post("/meal", seedController.seedMeals);
router.post("/category", seedController.seedCategory);
router.post("/providerprofile", seedController.seedProviderProfile);
router.post("/order", seedController.seedOrder);

export default router;