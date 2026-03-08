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

