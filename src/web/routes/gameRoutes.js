import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { createGameSchema, updateGameSchema } from "../schemas/gameSchema.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

export const gameRouter = (controller) => {
    const router = Router();

    // Public routes
    router.get('/', controller.handleGetAllVerified);
    router.get('/:id', controller.handleGetById);

    // Aunthenticated users routes
    const auth = Router();
    auth.use(authMiddleware);

    auth.get('/my-library', controller.handleGetUserLibraryWithDetails); // untested
    auth.post('/', validate(createGameSchema), controller.handleCreate);
    auth.put('/:id', validate(updateGameSchema), controller.handleUpdate);
    auth.delete('/:id', controller.handleDelete);

    // Admin routes
    const admin = Router();
    admin.use(roleMiddleware("admin"));
    admin.get('/:id', controller.handleGetById);

    return router;
}