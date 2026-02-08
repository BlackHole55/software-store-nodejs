import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { createCompanySchema, updateCompanySchema } from "../schemas/companySchema.js";

export const companyRouter = (controller) => {
    const router = Router();
    const auth = Router();

    auth.use(authMiddleware);
    auth.get('/verified', controller.handleGetAllVerified);

    const admin = Router();
    admin.use(roleMiddleware('admin'));
    admin.put('/:id/verify', controller.handleVerifySwitch);

    auth.use("/admin", admin); 

    auth.post('/', validate(createCompanySchema), controller.handleCreate);
    auth.put('/:id', validate(updateCompanySchema), controller.handleUpdate);
    auth.delete('/:id', controller.handleDelete);

    router.get('/', controller.handleGetAll);

    router.use("/", auth);

    router.get('/:id', controller.handleGetById);

    return router;
};