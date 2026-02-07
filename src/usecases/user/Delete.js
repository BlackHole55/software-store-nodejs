export class DeleteUserUseCase{
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    
    async execute(id){    
        await this.userRepo.delete(id);
    }
}