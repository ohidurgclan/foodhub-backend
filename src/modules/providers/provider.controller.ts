import { Request, Response } from "express";
// import { providerService } from "./provider.service";
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

