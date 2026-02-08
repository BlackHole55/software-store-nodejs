import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { createEmulationSchema, updateEmulationSchema } from "../schemas/emulationSchema.js";

export const emulationRouter = (controller) => {
    const router = Router();

    // Public routes
    router.get('/', controller.handleGetAll);
    router.get('/:id', controller.handleGetById);

    // User routes
    const auth = Router();
    auth.use(authMiddleware);

    auth.post('/', validate(createEmulationSchema), controller.handleCreate); 
    auth.put('/:id',validate(updateEmulationSchema), controller.handleUpdate);

    // Admin routes
    const admin = Router();
    admin.use(roleMiddleware('admin'));
    
    admin.delete('/:id', controller.handleDelete);

    auth.use("/admin", admin); 
    router.use("/", auth);

    return router;
};