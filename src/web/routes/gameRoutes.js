import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { createGameSchema, updateGameSchema } from "../schemas/gameSchema.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

export const gameRouter = (controller) => {
    const router = Router();
    
    // PUBLIC STATIC
    router.get('/', controller.handleGetAllVerified);
    router.get('/search', controller.handleSearchByTitle);

    // PRIVATE STATIC
    router.get('/my-library', authMiddleware, controller.handleGetUserLibraryWithDetails);
    router.get('/stats', authMiddleware, roleMiddleware("admin"), controller.handleGetStats);
    router.get('/my-uploads', authMiddleware, controller.handleGetByUserId);
    router.get('/admin', authMiddleware, roleMiddleware("admin"), controller.handleGetAll);

    // PUBLIC
    router.get('/', controller.handleGetAllVerified);

    router.get('/:id', controller.handleGetById);

    // ADMIN STATIC
    router.get('/admin', authMiddleware, roleMiddleware("admin"), controller.handleGetAll);

    // PUBLIC DYNAMIC
    router.get('/:id', controller.handleGetById);

    // PRIVATE DYNAMIC / ACTIONS
    router.patch('/:id/verify', authMiddleware, roleMiddleware("admin"), controller.handleVerifySwitch);

    router.post('/', authMiddleware, validate(createGameSchema), controller.handleCreate);
    router.put('/:id', authMiddleware, validate(updateGameSchema), controller.handleUpdate);
    router.delete('/:id', authMiddleware, controller.handleDelete);

    return router;
}