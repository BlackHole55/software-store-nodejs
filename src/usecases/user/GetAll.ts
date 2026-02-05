import type { User } from "../../domain/entities/User.js";
import type { IUserRepository } from "../../domain/repositories/IUserRepository.js";

export class GetAllUsersUseCase {
    constructor(private userRepo: IUserRepository) {}

    async execute(): Promise<User[]> {
        const users = await this.userRepo.getAll();

        if (!users || users.length === 0) {
            throw new Error("No users found");
        }

        return users;
 }
}