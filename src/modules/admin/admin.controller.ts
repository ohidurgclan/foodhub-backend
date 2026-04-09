import { Request, Response } from "express";
import { adminService } from "./admin.service";
import { ActiveStatus } from "../../../generated/prisma/client";

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await adminService.getAllUsers();
        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch users"
        });
    }
};

const updateUserStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const user = await adminService.updateUserStatus(id as string, status as ActiveStatus);
        res.json({
            success: true,
            message: "User status updated",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update user"
        });
    }
};

export const adminController = {
    getAllUsers,
    updateUserStatus,
};