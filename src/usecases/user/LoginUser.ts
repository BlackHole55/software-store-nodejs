import bcrypt from "bcryptjs";
import type { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import { JwtService } from "../../infrastructure/security/JwtService.js";

export class LoginUserUseCase {
    constructor(private userRepo: IUserRepository) {}

    async execute(email: string, password: string): Promise<{ token: string }> {
        const user = await this.userRepo.getByEmail(email);
        if (!user || !user.password_hash) {
            throw new Error("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

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