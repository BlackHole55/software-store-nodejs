import type { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import type { User } from "../../domain/entities/User.js";
import bcrypt from "bcryptjs";

export class RegisterUserUseCase {
    constructor(private userRepo: IUserRepository) {}

    async execute(user: User): Promise<void> {
        const existingUser = await this.userRepo.getByEmail(user.email);
        if (existingUser) {
            throw new Error("User with this email already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password!, salt)

        user.created_at = new Date();

        return await this.userRepo.create({
            ...user,
            password: hashedPassword
        });
    }
}