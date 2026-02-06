export class DeleteUserUseCase{
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    
    async execute(){    
        const existingUser = await this.userRepo.getById(userId);
        
        if (!existingUser) {
            throw new Error(`Cannot delete: User with ID ${userId} not found`);
        }

        await this.userRepo.delete(userId);
    }
}