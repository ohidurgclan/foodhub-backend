import { prisma } from "../../lib/prisma";

interface MealQuery {
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    categoryId?: string;
    providerId?: string;
    isAvailable?: boolean;
    page?: number;
    limit?: number;
}
interface ProviderQuery {
    search?: string;
    page?: number;
    limit?: number;
}

const getAllMeals = async (query: MealQuery) => {
    const {
        search,
        minPrice,
        maxPrice,
        categoryId,
        providerId,
        isAvailable,
        page = 1,
        limit = 10,
    } = query;

    const skip = (page - 1) * limit;

    const where: any = {
        AND: [],
    };

    if (search) {
        where.AND.push({
            name: {
                contains: search,
                mode: "insensitive",
            },
        });
    }

    if (minPrice || maxPrice) {
        where.AND.push({
            price: {
                gte: minPrice,
                lte: maxPrice,
            },
        });
    }

    if (categoryId) {
        where.AND.push({ categoryId });
    }

    if (providerId) {
        where.AND.push({ providerId });
    }

    if (isAvailable !== undefined) {
        where.AND.push({ isAvailable });
    }

    const [meals, total] = await Promise.all([
        prisma.meal.findMany({
            where: where.AND.length ? where : undefined,
            include: {
                provider: true,
                category: true,
            },
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
        }),
        prisma.meal.count({
            where: where.AND.length ? where : undefined,
        }),
    ]);

    return {
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
        data: meals,
    };
};

const getMealById = async (id: string) => {
    const meal = await prisma.meal.findUnique({
        where: { id },
        include: {
            provider: true,
            category: true,
            reviews: true,
        },
    });

    if (!meal) {
        throw new Error("Meal not found");
    }

    return meal;
};

const getAllProviders = async (query: ProviderQuery) => {
    const { search, page = 1, limit = 10 } = query;

    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
        where.OR = [
            {
                businessName: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                description: {
                    contains: search,
                    mode: "insensitive",
                },
            },
        ];
    }

    const [providers, total] = await Promise.all([
        prisma.providerProfile.findMany({
            where,
            include: {
                user: true, // provider owner
            },
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
        }),
        prisma.providerProfile.count({ where }),
    ]);
    return {
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
        data: providers,
    };
};

const getProviderById = async (id: string) => {
    const provider = await prisma.providerProfile.findUnique({
        where: { id },
        include: {
            user: true,
            meals: {
                where: { isAvailable: true },
                include: {
                    category: true,
                },
                orderBy: { createdAt: "desc" },
            },
        },
    });
    if (!provider) {
        throw new Error("Provider not found");
    }
    return provider;
};

export const MealService = {
    getAllMeals,
    getMealById,
    getAllProviders,
    getProviderById,
};