import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { gameSchema } from "../schemas/gameSchema.js";

export const gameRouter = (controller) => {
    const router = Router();

    router.post('/', authMiddleware, validate(gameSchema), controller.handleCreate);

    return router;
}