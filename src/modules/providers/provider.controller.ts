import { Request, Response } from "express";
import { providerService } from "./provider.service";
import { prisma } from "../../lib/prisma";


const addMeal = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;

        const provider = await prisma.providerProfile.findUnique({
            where: { userId }
        });

        if (!provider) {
            return res.status(403).json({
                success: false,
                message: "Not a provider"
            });
        }

        const meal = await providerService.addMeal(provider.id, req.body);

        res.status(201).json({
            success: true,
            data: meal
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateMeal = async (req: Request, res: Response) => {
    try {

        const userId = req.user!.id;

        const provider = await prisma.providerProfile.findUnique({
            where: { userId }
        });

        const meal = await providerService.updateMeal(
            provider!.id,
            req.params.id as string,
            req.body
        );

        res.json({
            success: true,
            data: meal
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteMeal = async (req: Request, res: Response) => {
    try {

        const userId = req.user!.id;

        const provider = await prisma.providerProfile.findUnique({
            where: { userId }
        });

        await providerService.deleteMeal(provider!.id, req.params.id as string);

        res.json({
            success: true,
            message: "Meal deleted"
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateOrderStatus = async (req: Request, res: Response) => {
    try {

        const userId = req.user!.id;

        const provider = await prisma.providerProfile.findUnique({
            where: { userId }
        });

        const order = await providerService.updateOrderStatus(
            provider!.id,
            req.params.id as string,
            req.body.status
        );

        res.json({
            success: true,
            data: order
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const providerController = {
    addMeal,
    updateMeal,
    deleteMeal,
    updateOrderStatus
};