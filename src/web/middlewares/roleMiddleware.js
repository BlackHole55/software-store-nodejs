import { UserModel } from "../../infrastructure/mongoose/models/UserModel.js";

export const roleMiddleware = (requiredRole) => {
    return async (req, res, next) => {
        try {
            if (!req.user || !req.user.id) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            const user = await UserModel.findById(req.user.id);

            if (!user || user.role !== requiredRole) {
                return res.status(403).json({ 
                    error: "Forbidden: You don't have enough permissions" 
                });
            }

            next();
        } catch (error) {
            console.error("Role Middleware Error:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    };
};