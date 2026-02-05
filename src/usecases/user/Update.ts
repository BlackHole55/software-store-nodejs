import type { User } from "../../domain/entities/User.js";
import type { IUserRepository } from "../../domain/repositories/IUserRepository.js";

export class UpdateUserUseCase{
    constructor(private userRepo: IUserRepository) {}
    
    async execute(userId: string, updates: Partial<User>): Promise<void> {    
            const existingUser = await this.userRepo.getById(userId);
        
            if (!existingUser) {
                throw new Error(`Cannot update: User with ID ${userId} not found`);
            }

            await this.userRepo.update(userId, updates);
        }
}