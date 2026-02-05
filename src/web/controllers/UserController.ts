import type { Request, Response } from 'express';
import { RegisterUserUseCase } from "../../usecases/user/RegisterUser.js";
import { LoginUserUseCase } from '../../usecases/user/LoginUser.js';

export class UserController{
    constructor(
        private registerUserUC: RegisterUserUseCase,
        private loginUserUC: LoginUserUseCase
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
}
