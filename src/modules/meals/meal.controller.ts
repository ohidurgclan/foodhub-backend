import { Request, Response } from "express";
import { MealService } from "./meal.service";

const getMeals = async (req: Request, res: Response) => {
    try {
        const result = await MealService.getAllMeals({
            ...(req.query.search && { search: req.query.search as string }),
            ...(req.query.minPrice && { minPrice: Number(req.query.minPrice) }),
            ...(req.query.maxPrice && { maxPrice: Number(req.query.maxPrice) }),
            ...(req.query.categoryId && { categoryId: req.query.categoryId as string }),
            ...(req.query.providerId && { providerId: req.query.providerId as string }),
            ...(req.query.isAvailable && { isAvailable: req.query.isAvailable === "true" }),
            page: req.query.page ? Number(req.query.page) : 1,
            limit: req.query.limit ? Number(req.query.limit) : 10,
        });
        res.status(200).json({
            success: true,
            ...result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getMealDetails = async (req: Request, res: Response) => {
    try {
        const meal = await MealService.getMealById(req.params.id as string);

        res.status(200).json({
            success: true,
            data: meal,
        });
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

const getProviders = async (req: Request, res: Response) => {
    try {
        const result = await MealService.getAllProviders({
            search: req.query.search as string,
            page: req.query.page ? Number(req.query.page) : 1,
            limit: req.query.limit ? Number(req.query.limit) : 10,
        });

        res.status(200).json({
            success: true,
            ...result,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getProviderDetails = async (req: Request, res: Response) => {
    try {
        const provider = await MealService.getProviderById(req.params.id as string);

        res.status(200).json({
            success: true,
            data: provider,
        });
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};



export const MealController = {
    getMeals,
    getMealDetails,
    getProviders,
    getProviderDetails
};
