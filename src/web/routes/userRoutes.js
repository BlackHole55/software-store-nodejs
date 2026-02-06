import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
// import { userSchema } from "../schemas/userSchema.js";
import { userSchema, updateUserSchema, paramsIdSchema } from "../schemas/userSchema.js";

export const userRouter = (controller) => {
    const router = Router();

    router.post('/signup', validate(userSchema), controller.handleRegister);
    router.post('/login', (req, res) => controller.handleLogin(req, res));
    router.put('/:id', authMiddleware, validate(updateUserSchema), controller.handleUpdate);
    router.get('/admin', authMiddleware, controller.handleGetAll);
    router.get('/:id', controller.handleGetById);
    return router;
}