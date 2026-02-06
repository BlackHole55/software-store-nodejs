import type { User } from "../../domain/entities/User.js";
import type { IUserRepository } from "../../domain/repositories/IUserRepository.js";

export class GetByIdUserUseCase{
    constructor(private userRepo: IUserRepository) {}
    
    async execute(userId: string): Promise<User> {    
            const user = await this.userRepo.getById(userId);
            if (!user) {
                throw new Error(`User with ID ${userId} not found`);
            }
            return user;
        }
}