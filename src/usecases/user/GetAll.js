export class GetAllUsersUseCase {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }

    async execute() {
        const users = await this.userRepo.getAll();

        if (!users || users.length === 0) {
            throw new Error("No users found");
        }

        return users;
 }
}