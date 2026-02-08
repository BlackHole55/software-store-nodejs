import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { createCompanySchema, updateCompanySchema } from "../schemas/companySchema.js";

export const companyRouter = (controller) => {
    const router = Router();

    // PUBLIC
    router.get('/verified', controller.handleGetAllVerified);
    router.get('/:id', controller.handleGetById);
    router.get('/', controller.handleGetAll);

    // PROTECTED ROUTER 
    const auth = Router();
    auth.use(authMiddleware);

    // ADMIN ROUTES
    const admin = Router();
    admin.use(roleMiddleware('admin'));
    admin.patch('/:id/verify', controller.handleVerifySwitch);

    auth.use("/admin", admin); 

    // Authenticated CRUD operations
    auth.post('/', validate(createCompanySchema), controller.handleCreate);
    auth.put('/:id', validate(updateCompanySchema), controller.handleUpdate);
    auth.delete('/:id', controller.handleDelete);

    router.use("/", auth);

    return router;
};