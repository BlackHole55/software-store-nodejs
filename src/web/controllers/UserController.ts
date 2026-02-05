import type { Request, Response } from 'express';
import type { CreateUserUseCase } from "../../usecases/user/CreateUser.js";

export class UserController{
    constructor(
        private createUserUC: CreateUserUseCase
    ){}

     async handleCreate(req: Request, res: Response) {
        try {
            const userData = req.body;
                
            await this.createUserUC.execute(userData);
    
            return res.status(201).json({ message: "User created successfuly" });
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }
}
