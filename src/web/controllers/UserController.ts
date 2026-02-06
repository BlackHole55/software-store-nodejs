import type { Request, Response } from 'express';
import { RegisterUserUseCase } from "../../usecases/user/RegisterUser.js";
import { LoginUserUseCase } from '../../usecases/user/LoginUser.js';
import { UpdateUserUseCase } from '../../usecases/user/Update.js';
import { GetByIdUserUseCase } from '../../usecases/user/GetById.js';
import { GetAllUsersUseCase } from '../../usecases/user/GetAll.js';
import { DeleteUserUseCase } from '../../usecases/user/Delete.js';

export class UserController{
    constructor(
        private registerUserUC: RegisterUserUseCase,
        private loginUserUC: LoginUserUseCase,
        private updateUserUC: UpdateUserUseCase,
        private getAllUserUC: GetAllUsersUseCase,
        private getByIdUserUC: GetByIdUserUseCase,
        private deleteUserUc: DeleteUserUseCase
    ){}

    async handleRegister(req: Request, res: Response) {
        try {
            const userData = req.body;
                
            await this.registerUserUC.execute(userData);
    
            return res.status(201).json({ message: "User registered successfuly" });
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }

    async handleLogin(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const result = await this.loginUserUC.execute(email, password);

            return res.status(200).json(result);
        } catch (err: any) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
    }

    async update(req: Request, res: Response){
        try {
            const userId = req.params.id || (req as any).user?.id;

            if (!userId) {
                 return res.status(400).json({ error: "User ID is required" });
            }

            const updates = req.body

            await this.updateUserUC.execute(userId, updates)

            return res.status(200).json({ message: "User updated successfully" });
        } catch (err: any) {
            return res.status(404).json({ error: err.message });
        }
    }

    async getAll(req: Request, res: Response){
        try {
            const users = await this.getAllUserUC.execute();

            return res.status(200).json(users);

        } catch (err: any) {
            const statusCode = err.message === "No users found" ? 404 : 500;
            return res.status(statusCode).json({ error: err.message });
        }
    }

    async getById(req: Request, res: Response){
        try {
            const userId = req.params.id || (req as any).user?.id;

            const user = await this.getByIdUserUC.execute(userId)

            return res.status(200).json(user)

        } catch (err: any) {
            //TODO
        }
    }

    async getProfile(req: Request, res: Response) {
        try {
            const userID = (req as any).user?.id;

            if (!userID) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            const user = await this.getByIdUserUC.execute(userID);

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const { password, ...userProfile } = user;

            return res.status(200).json(userProfile);

        } catch (err: any) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const userId = req.params.id as string;

            if (!userId) {
                return res.status(400).json({ error: "User ID is required" });
            }   

            // check
            const currentUserId = (req as any).user?.id;
            if (currentUserId === userId) {
                return res.status(400).json({ error: "You cannot delete your own account from the admin panel" });
            }

            await this.deleteUserUc.execute(userId);
            return res.status(200).json({ message: "User deleted successfully" });

        } catch (err: any) {
            const statusCode = err.message.includes("not found") ? 404 : 500;
            return res.status(statusCode).json({ error: err.message });
        }
    }
}
