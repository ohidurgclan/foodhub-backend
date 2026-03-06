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

const createOrder = async (payload: CreateOrderPayload) => {
    const { userId, providerId, deliveryAddress, phone, items } = payload;
    const totalAmount = items.reduce((sum: number, item: any) => sum + item.price * item.quantity,0
    );
    const order = await prisma.order.create({
        data: {
            userId,
            providerId,
            deliveryAddress,
            phone,
            totalAmount,
            items: {
                create: items.map((item: OrderItemPayload) => ({
                    mealId: item.mealId,
                    quantity: item.quantity,
                    price: item.price,
                })),
            },
        },
        include: {
            items: true,
        },
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