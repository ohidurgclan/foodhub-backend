import { prisma } from "../../lib/prisma";

interface OrderItemPayload {
    mealId: string;
    quantity: number;
    price: number;
}

interface CreateOrderPayload {
    userId: string;
    providerId: string;
    deliveryAddress: string;
    phone: string;
    totalAmount: number;
    items: OrderItemPayload[];
}

const createOrder = async (userId: string, payload: any) => {
    const { providerId, deliveryAddress, phone, items } = payload;

    if (!items || items.length === 0) {
        throw new Error("Order must contain items");
    }

    const mealIds = items.map((i: any) => i.mealId);

    const meals = await prisma.meal.findMany({
        where: {
            id: { in: mealIds }
        }
    });

    if (meals.length === 0) {
        throw new Error("Meals not found");
    }

    let totalAmount = 0;

    const orderItems = items.map((item: any) => {
        const meal = meals.find(m => m.id === item.mealId);

        if (!meal) {
            throw new Error("Meal not found");
        }

        const itemTotal = meal.price * item.quantity;
        totalAmount += itemTotal;

        return {
            mealId: item.mealId,
            quantity: item.quantity,
            price: meal.price
        };
    });

    const order = await prisma.order.create({
        data: {
            userId,
            providerId,
            deliveryAddress,
            phone,
            totalAmount,
            items: {
                create: orderItems
            }
        },
        include: {
            items: true
        }
    });

    return order;
};

const getUserOrders = async (userId: string) => {
    const orders = await prisma.order.findMany({
        where: {
            userId
        },
        include: {
            items: {
                include: {
                    meal: true
                }
            },
            provider: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    return orders;
};

const getOrderDetails = async (orderId: string) => {
    const order = await prisma.order.findUnique({
        where: {
            id: orderId
        },
        include: {
            items: {
                include: {
                    meal: true
                }
            },
            provider: true,
            user: true
        }
    });
    if (!order) {
        throw new Error("Order not found");
    }
    return order;
};

export const orderService = {
    createOrder,
    getUserOrders,
    getOrderDetails
}