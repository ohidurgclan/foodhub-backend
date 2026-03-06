import { Request, Response } from "express";
import { seedServices } from "./seed.services";

const seedMeals = async (req: Request, res: Response) => {
    try {
        const meal = await seedServices.createMeal({
            name: req.body.name,
            description: req.body.description,
            price: Number(req.body.price),
            image: req.body.image,
            isAvailable: req.body.isAvailable,
            providerId: req.body.providerId,
            categoryId: req.body.categoryId,
        });

        res.status(201).json({
            success: true,
            message: "Meal created successfully",
            data: meal,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const seedCategory = async (req: Request, res: Response) => {
    try {
        const category = await seedServices.createCategory({
            name: req.body.name,
        });

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: category,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const seedProviderProfile = async (req: Request, res: Response) => {
    try {
        const profile = await seedServices.createProviderProfile(req.body);

        res.status(201).json({
            success: true,
            message: "Provider profile created successfully",
            data: profile,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const seedController = {
    seedMeals,
    seedCategory,
    seedProviderProfile
}