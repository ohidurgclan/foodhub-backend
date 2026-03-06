import { Router } from "express";
import { orderController } from "./order.controller";

const router = Router();
router.post("/orders", orderController.createOrder);
router.get("/orders", orderController.getUserOrders);
router.get("/orders/:id", orderController.getOrderDetails);

export default router;