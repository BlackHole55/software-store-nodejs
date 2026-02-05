import type { IUserRepository } from "../../domain/repositories/IUserRepository.js";
import type { User } from "../../domain/entities/User.js";

export class CreateUserUseCase {
    constructor(private userRepo: IUserRepository) {}

    async execute(user: User): Promise<void> {
        user.created_at = new Date();

        return await this.userRepo.create(user)
    }
}