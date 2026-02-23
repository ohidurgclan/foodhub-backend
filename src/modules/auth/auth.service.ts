import { auth } from "../../lib/auth";
import { Request } from "express";
import { convertToWebHeaders } from "../../utils/conversionhelper";

const registerUser = async (req: Request) => {
    const headers = convertToWebHeaders(req.headers);
    const response = await auth.api.signUpEmail({
        body: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        },
        headers,
        asResponse: true
    });

    return response;
};

const loginUser = async (req: Request) => {
    const headers = convertToWebHeaders(req.headers);
    const response = await auth.api.signInEmail({
        body: {
            email: req.body.email,
            password: req.body.password,
        },
        headers,
        asResponse: true,
    });

    return response;
};

const getCurrentUser = async (req: Request) => {
    const headers = new Headers();

    Object.entries(req.headers).forEach(([key, value]) => {
        if (typeof value === "string") {
            headers.append(key, value);
        }
    });

    const session = await auth.api.getSession({ headers });

    if (!session) {
        throw new Error("Unauthorized");
    }

    return session.user;
};

export const authServices = {
    registerUser,
    loginUser,
    getCurrentUser
};