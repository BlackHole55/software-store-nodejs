import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { createGameSchema, updateGameSchema } from "../schemas/gameSchema.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

export const gameRouter = (controller) => {
    const router = Router();
    
    // PUBLIC
    router.get('/', controller.handleGetAllVerified);
    router.get('/:id', controller.handleGetById);

    // PRIVATE - Specific
    router.get('/my-library', authMiddleware, controller.handleGetUserLibraryWithDetails);

    // PRIVATE - Admin
    router.get('/admin', authMiddleware, roleMiddleware("admin"), controller.handleGetAll);
    router.patch('/:id/verify', authMiddleware, roleMiddleware("admin"), controller.handleVerifySwitch);

    // PRIVATE - Actions
    router.post('/', authMiddleware, validate(createGameSchema), controller.handleCreate);
    router.put('/:id', authMiddleware, validate(updateGameSchema), controller.handleUpdate);
    router.delete('/:id', authMiddleware, controller.handleDelete);

    return router;
}