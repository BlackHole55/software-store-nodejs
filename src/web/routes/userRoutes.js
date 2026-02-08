import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { createUserSchema, updateUserSchema } from "../schemas/userSchema.js";

export const userRouter = (controller) => {
    const router = Router();

    router.post('/signup', validate(createUserSchema), controller.handleRegister);
    router.post('/login', controller.handleLogin);

    const auth = Router();
    auth.use(authMiddleware);

    auth.get("/profile", controller.handleGetProfile);

    const admin = Router();
    admin.use(roleMiddleware("admin"));
    
    admin.get("/all", controller.handleGetAll); 
    admin.delete("/:id", controller.handleDelete);

    auth.use("/admin", admin);

    auth.get("/:id", controller.handleGetById);
    auth.put('/:id', validate(updateUserSchema), controller.handleUpdate);

    router.use("/", auth);

    return router;
};