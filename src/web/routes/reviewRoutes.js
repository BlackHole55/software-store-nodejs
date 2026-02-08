import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { createReviewSchema, updateReviewSchema } from "../schemas/reviewSchema.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

export const gameRouter = (controller) => {
    const router = Router();
    
    // Public routes
    router.get('/:id', controller.handleGetByGameId);

    // Aunthenticated users routes
    const auth = Router();
    auth.use(authMiddleware);

    auth.post('/', validate(createReviewSchema), controller.handleCreate);
    auth.put('/:id', validate(updateReviewSchema), controller.handleUpdate);
    auth.delete('/:id', controller.handleDelete);

    // Admin routes
    const admin = Router();
    admin.use(roleMiddleware("admin"));
    admin.get('/', controller.handleGetAll);

    auth.use('/admin', admin);
    router.use('/', auth);

    return router;
}