import { Router } from "express";
import type { GameController } from "../controllers/GameController.js";

export const gameRouter = (controller: GameController) => {
    const router = Router();

    router.post('/', (req, res) => controller.handleCreate(req, res));

    return router;
}