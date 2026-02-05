import type { IUserRepository } from "../../domain/repositories/IUserRepository.js";

export class UpdateUserUseCase{
    constructor(private userRepo: IUserRepository) {}
    
    async execute(userId: string): Promise<void> {    
            const existingUser = await this.userRepo.getById(userId);
        
            if (!existingUser) {
                throw new Error(`Cannot delete: User with ID ${userId} not found`);
            }

            await this.userRepo.delete(userId);
        }
}