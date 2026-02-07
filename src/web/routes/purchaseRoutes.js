import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { purchaseSchema} from "../schemas/purchaseSchema.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

export const gameRouter = (controller) => {
    const router = Router();
    router.use(authMiddleware);

    router.post('/', validate(createGameSchema), controller.handleCreate);
    router.get('/:id', controller.handleGetById);
    router.delete('/:id', controller.handleDelete);

    // Admin routes
    const admin = Router();
    admin.use(roleMiddleware("admin"));
    admin.get('/', controller.handleGetAll);

    router.use('/admin', admin);

    return router;
}