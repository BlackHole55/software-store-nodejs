export class DeleteUserUseCase{
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    
    async execute(){    
        await this.userRepo.delete(userId);
    }
}