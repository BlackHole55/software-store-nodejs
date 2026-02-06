export class CreateGameUseCase {
    constructor(gameRepo) {
        this.gameRepo = gameRepo;
    }

    async execute(id, game) {
        return await this.gameRepo.update(id, game)
    }
}