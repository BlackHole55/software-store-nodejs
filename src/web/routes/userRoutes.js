import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { userSchema } from "../schemas/userSchema.js";

export const userRouter = (controller) => {
    const router = Router();

    router.post('/signup', validate(userSchema), controller.handleRegister);
    router.post('/login', (req, res) => controller.handleLogin(req, res));

    return router;
}