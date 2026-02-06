import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { createGameSchema, updateGameSchema } from "../schemas/gameSchema.js";

export const gameRouter = (controller) => {
    const router = Router();

    router.get('/', controller.handleGetAllVerified);
    router.get('/admin', authMiddleware, controller.handleGetAll);
    router.get('/:id', controller.handleGetById);

    router.post('/', authMiddleware, validate(createGameSchema), controller.handleCreate);
    router.get('/my-library', authMiddleware, controller.handleGetUserLibraryWithDetails);
    router.put('/:id', authMiddleware, validate(updateGameSchema), controller.handleUpdate);
    // router.delete('/:id', authMiddleware, controller.handleDelete);

    return router;
}