import { Router } from "express";
import { providerController } from "./provider.controller";

const router = Router();

router.post("/provider/meals", providerController.addMeal);
router.put("/provider/meals/:id", providerController.updateMeal);
router.delete("/provider/meals/:id", providerController.deleteMeal);
router.patch("/provider/orders/:id", providerController.updateOrderStatus);

export default router;