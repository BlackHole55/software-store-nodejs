import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { createUserSchema, updateUserSchema } from "../schemas/userSchema.js";

export const userRouter = (controller) => {
    const router = Router();

    // Public routes
    router.post('/signup', validate(createUserSchema), controller.handleRegister);
    router.post('/login', controller.handleLogin);


    // PROTECTED ROUTES 
    const auth = Router();
    auth.use(authMiddleware);

    auth.get("/profile", controller.handleGetProfile);

    // ADMIN ROUTES
    const admin = Router();
    admin.use(roleMiddleware("admin"));
    
    admin.get("/all", controller.handleGetAll); 
    admin.delete("/:id", controller.handleDelete);

    auth.use("/admin", admin);

    // USER ROUTES
    auth.get("/:id", controller.handleGetById);
    auth.put('/:id', validate(updateUserSchema), controller.handleUpdate);

    router.use("/", auth);

    return router;
};