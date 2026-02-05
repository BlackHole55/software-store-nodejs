import { Router } from "express";
import type { GameController } from "../controllers/GameController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const gameRouter = (controller: GameController) => {
    const router = Router();

    router.post('/', authMiddleware, (req, res) => controller.handleCreate(req, res));

    return router;
}