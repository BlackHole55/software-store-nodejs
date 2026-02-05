import { Router } from "express";
import type { UserController } from "../controllers/UserController.js";

export const userRouter = (controller: UserController) => {
    const router = Router();

    router.post('/', (req, res) => controller.handleCreate(req, res));

    return router;
}