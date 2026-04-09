import { Router } from "express";
import { adminController } from "./admin.controller";

const router = Router();

router.get( "/admin/users", adminController.getAllUsers);
router.patch("/admin/users/:id", adminController.updateUserStatus);

export default router;