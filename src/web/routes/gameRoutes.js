import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { createGameSchema, updateGameSchema } from "../schemas/gameSchema.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

export const gameRouter = (controller) => {
    const router = Router();
    const auth = Router();

    auth.use(authMiddleware);

    auth.get('/my-library', controller.handleGetUserLibraryWithDetails);
    auth.post('/', validate(createGameSchema), controller.handleCreate);
    auth.put('/:id', validate(updateGameSchema), controller.handleUpdate);
    auth.delete('/:id', controller.handleDelete);

    const admin = Router();
    admin.use(roleMiddleware("admin"));
    
    admin.get('/all', controller.handleGetAll); 
    admin.patch('/:id/verify', controller.handleVerifySwitch);

    auth.use('/admin', admin);


    router.get('/', controller.handleGetAllVerified);
    
    router.use("/", auth);

    router.get('/:id', controller.handleGetById);

    return router;
};