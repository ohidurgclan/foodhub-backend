import { Request, Response } from "express";
import { orderService } from "./order.services";

const createOrder = async (req: Request, res: Response) => {
    try {
        const order = await orderService.createOrder(req.body);
        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create order",
            error
        });
    }
};
export const orderController = {
    createOrder
};