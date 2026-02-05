import type { Request, Response } from 'express';
import type { RegisterUserUseCase } from "../../usecases/user/RegisterUser.js";

export class UserController{
    constructor(
        private createUserUC: RegisterUserUseCase
    ){}

     async handleCreate(req: Request, res: Response) {
        try {
            const userData = req.body;
                
            await this.createUserUC.execute(userData);
    
            return res.status(201).json({ message: "User registered successfuly" });
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }
}
