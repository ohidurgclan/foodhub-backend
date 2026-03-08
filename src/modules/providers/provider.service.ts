import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const addMeal = async (providerId: string, payload: any) => {
    return prisma.meal.create({
        data: {
            ...payload,
            providerId
        }
    });
};

const updateMeal = async (providerId: string, mealId: string, payload: any) => {
    const meal = await prisma.meal.findFirst({
        where: {
            id: mealId,
            providerId
        }
    });
    if (!meal) {
        throw new Error("Meal not found or unauthorized");
    }
    return prisma.meal.update({
        where: { id: mealId },
        data: payload
    });
};
const deleteMeal = async (providerId: string, mealId: string) => {
    const meal = await prisma.meal.findFirst({
        where: {
            id: mealId,
            providerId
        }
    });
    if (!meal) {
        throw new Error("Meal not found or unauthorized");
    }
    return prisma.meal.delete({
        where: { id: mealId }
    });
};
