export class DeleteGameUseCase {
    constructor(gameRepo) {
        this.gameRepo = gameRepo;
    }

    async execute() {
        return await this.gameRepo.delete();
    }
}