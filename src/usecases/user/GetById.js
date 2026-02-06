export class GetByIdUserUseCase{
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    
    async execute(userId) {    
        const user = await this.userRepo.getById(userId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found`);
        }
        return user;
    }
}