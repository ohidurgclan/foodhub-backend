import { Request, Response } from "express";
import { orderService } from "./order.services";

const createOrder = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        const userId = req.user.id;
        const order = await orderService.createOrder(userId, req.body);
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
const getUserOrders = async (req: Request, res: Response) => {
    const userId = (req as { user: { id: string } }).user.id;
    try {
        const orders = await orderService.getUserOrders(userId);
        res.json({
            success: true,
            data: orders
        });
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

const getOrderDetails = async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    try {
        const order = await orderService.getOrderDetails(id);
        res.json({
            success: true,
            data: order
        });
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};
export const orderController = {
    createOrder,
    getUserOrders,
    getOrderDetails
};