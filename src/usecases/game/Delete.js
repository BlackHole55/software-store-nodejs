export class DeleteGameUseCase {
    constructor(gameRepo) {
        this.gameRepo = gameRepo;
    }

    async execute(id) {
        return await this.gameRepo.delete(id);
    }
}