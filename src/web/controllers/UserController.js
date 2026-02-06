import { RegisterUserUseCase } from "../../usecases/user/RegisterUser.js";
import { LoginUserUseCase } from '../../usecases/user/LoginUser.js';
import { UpdateUserUseCase } from '../../usecases/user/Update.js';
import { GetByIdUserUseCase } from '../../usecases/user/GetById.js';
import { GetAllUsersUseCase } from '../../usecases/user/GetAll.js';
import { DeleteUserUseCase } from '../../usecases/user/Delete.js';

export class UserController {
    constructor(
        registerUserUC,
        loginUserUC,
        updateUserUC,
        getByIdUserUC,
        getAllUserUC,
        deleteUserUC
    ) {
        this.registerUserUC = registerUserUC;
        this.loginUserUC = loginUserUC;
        this.updateUserUC = updateUserUC;
        this.getByIdUserUC = getByIdUserUC;
        this.getAllUserUC = getAllUserUC;
        this.deleteUserUC = deleteUserUC;
    }

    handleRegister = async (req, res) => {
        try {
            const userData = req.body;
            await this.registerUserUC.execute(userData);
            return res.status(201).json({ message: "User registered successfully" });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    };

    handleLogin = async (req, res) => {
        try {
            const { email, password } = req.body;
            const result = await this.loginUserUC.execute(email, password);
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
    };

    handleUpdate = async (req, res) => {
        try {
            const userId = req.params.id || req.user?.id;
            if (!userId) {
                return res.status(400).json({ error: "User ID is required" });
            }

            const updates = req.body;
            await this.updateUserUC.execute(userId, updates);
            return res.status(200).json({ message: "User updated successfully" });
        } catch (err) {
            return res.status(404).json({ error: err.message });
        }
    };

    handleGetAll = async (req, res) => {
        try {
            const users = await this.getAllUserUC.execute();
            return res.status(200).json(users);
        } catch (err) {
            const statusCode = err.message === "No users found" ? 404 : 500;
            return res.status(statusCode).json({ error: err.message });
        }
    };

    handleGetById = async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await this.getByIdUserUC.execute(userId);
            if (!user) return res.status(404).json({ error: "User not found" });
            
            return res.status(200).json(user);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    };

    handleGetProfile = async (req, res) => {
        try {
            const userID = req.user?.id;
            if (!userID) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            const user = await this.getByIdUserUC.execute(userID);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const { password, ...userProfile } = user;
            return res.status(200).json(userProfile);
        } catch (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
    };

    handleDelete = async (req, res) => {
        try {
            const userId = req.params.id;
            if (!userId) {
                return res.status(400).json({ error: "User ID is required" });
            }

            const currentUserId = req.user?.id;
            if (currentUserId === userId) {
                return res.status(400).json({ error: "You cannot delete your own account" });
            }

            await this.deleteUserUC.execute(userId);
            return res.status(200).json({ message: "User deleted successfully" });
        } catch (err) {
            const statusCode = err.message.includes("not found") ? 404 : 500;
            return res.status(statusCode).json({ error: err.message });
        }
    };
}