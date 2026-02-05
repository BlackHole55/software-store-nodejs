import type { User } from "../../domain/entities/User.js";
import type { IUserRepository } from "../../domain/repositories/IUserRepository.js";

export class GetByEmailUserUseCase{
    constructor(private userRepo: IUserRepository) {}
    
    async execute(email: string): Promise<User> {    
            const user = await this.userRepo.getByEmail(email);
            if (!user) {
                throw new Error(`User with Email ${email} not found`);
            }

            return user;
        }
}