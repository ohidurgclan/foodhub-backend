import { Request, Response } from "express";
import { authServices } from "./auth.service";

const register = async (req: Request, res: Response) => {
  try {
    const response = await authServices.registerUser(req);
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    const data = await response.json();
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: data.user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const response = await authServices.loginUser(req);
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    const data = await response.json();
    console.log("Login response data:", data);
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: data.user,
      token: data.token, 
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};

const getMe = async (req: Request, res: Response) => {
  try {
    const user = await authServices.getCurrentUser(req);

    res.status(200).json({
      success: true,
      user,
    });
  } catch {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};
export const authController = {
  register,
  login,
  getMe,
};