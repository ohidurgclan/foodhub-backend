import { prisma } from "../../lib/prisma";

interface MealPayload {
    name: string;
    description?: string;
    price: number;
    image?: string;
    isAvailable?: boolean;
    providerId: string;
    categoryId: string;
}
interface CategoryPayload {
    name: string;
}

interface ProviderProfilePayload {
    userId: string;
    businessName: string;
    description?: string;
    address: string;
    phone?: string;
    logo?: string;
}

const createMeal = async (payload: MealPayload) => {
    const {
        name,
        description,
        price,
        image,
        isAvailable = true,
        providerId,
        categoryId,
    } = payload;
    const provider = await prisma.providerProfile.findUnique({
        where: { id: providerId },
    });
    if (!provider) {
        throw new Error("Provider not found");
    }
    const category = await prisma.category.findUnique({
        where: { id: categoryId },
    });
    if (!category) {
        throw new Error("Category not found");
    }
    const meal = await prisma.meal.create({
        data: {
            name,
            description: description ?? null,
            price,
            image: image ?? null,
            isAvailable,
            providerId,
            categoryId,
        },
    });
    return meal;
};

const createCategory = async (payload: CategoryPayload) => {
    const { name, } = payload;
    const existing = await prisma.category.findUnique({
        where: { name },
    });
    if (existing) {
        throw new Error("Category already exists");
    }
    const category = await prisma.category.create({
        data: {
            name
        },
    });
    return category;
};

const createProviderProfile = async (payload: ProviderProfilePayload) => {
    const { userId, businessName, description, address, phone, logo } = payload;
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new Error("User not found");
    }
    if (user.role !== "PROVIDER") {
        throw new Error("User is not a provider");
    }
    const existingProfile = await prisma.providerProfile.findUnique({
        where: { userId },
    });
    if (existingProfile) {
        throw new Error("Provider profile already exists");
    }

    const profile = await prisma.providerProfile.create({
        data: {
            userId,
            businessName,
            description,
            address,
            phone,
            logo,
        },
    });
    return profile;
};

export const seedServices = {
    createMeal,
    createCategory,
    createProviderProfile
}