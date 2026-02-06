import type { User } from "../../domain/entities/User.js";
import type { IUserRepository } from "../../domain/repositories/IUserRepository.js";

export class UpdateUserUseCase {
    constructor(private userRepo: IUserRepository) {}

    async execute(userId: string, updates: Partial<User>): Promise<void> {
        const existingUser = await this.userRepo.getById(userId);
        if (!existingUser) {
            throw new Error(`Cannot update: User with ID ${userId} not found`);
        }

        const protectedFields = ['role', 'id', '_id', 'password'];
        protectedFields.forEach(field => {
            delete (updates as any)[field];
        });

        if (Object.keys(updates).length === 0) {
            return; 
        }

        await this.userRepo.update(userId, updates);
    }
}