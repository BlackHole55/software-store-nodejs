import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { createCompanySchema, updateCompanySchema } from "../schemas/companySchema.js";

export const companyRouter = (controller) => {
    const router = Router();

    // PROTECTED ROUTER 
    const auth = Router();
    auth.use(authMiddleware);

    // Verified companies list (for authenticated users)
    auth.get('/verified', controller.handleGetAllVerified);

    // ADMIN ROUTES
    const admin = Router();
    admin.use(roleMiddleware('admin'));
    admin.put('/:id/verify', controller.handleVerifySwitch);

    auth.use("/admin", admin); 

    // Authenticated CRUD operations
    auth.post('/', validate(createCompanySchema), controller.handleCreate);
    auth.put('/:id', validate(updateCompanySchema), controller.handleUpdate);
    auth.delete('/:id', controller.handleDelete);
    
    // PUBLIC: Get all companies 
    router.get('/', controller.handleGetAll);

    router.use("/", auth);

    // PUBLIC: Get company by ID
    router.get('/:id', controller.handleGetById);

    return router;
};