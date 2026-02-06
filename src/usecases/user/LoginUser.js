import bcrypt from "bcryptjs";
import { JwtService } from "../../infrastructure/security/JwtService.js";

export class LoginUserUseCase {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }

    async execute(email, password) {
        const user = await this.userRepo.getByEmail(email);
        if (!user || !user.password) {
            throw new Error("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        const token = JwtService.generateToken({
            id: user.id,
            role: user.role
        });

        return { token };
    }
}