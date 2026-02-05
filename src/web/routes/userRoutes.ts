import { Router } from "express";
import type { UserController } from "../controllers/UserController.js";

export const userRouter = (controller: UserController) => {
    const router = Router();

    router.post('/register', (req, res) => controller.handleRegister(req, res));
    router.post('/login', (req, res) => controller.handleLogin(req, res));

    return router;
}