import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { createEmulationSchema, updateEmulationSchema } from "../schemas/emulationSchema.js";

export const emulationRouter = (controller) => {
    const router = Router();

    // PUBLIC ROUTES
    router.get('/', controller.handleGetAll);

    // PROTECTED ROUTES
    const auth = Router();
    auth.use(authMiddleware);

    auth.post('/', validate(createEmulationSchema), controller.handleCreate); 
    auth.put('/:id', validate(updateEmulationSchema), controller.handleUpdate);

    // ADMIN-ONLY ROUTES 
    const admin = Router();
    admin.use(roleMiddleware('admin'));
    
    admin.delete('/:id', controller.handleDelete);

    auth.use("/admin", admin); 
    
    router.use("/", auth);
    
    // DYNAMIC PUBLIC ROUTES
    router.get('/:id', controller.handleGetById);

    return router;
};