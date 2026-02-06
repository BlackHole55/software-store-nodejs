export class CreateGameUseCase {
    constructor(gameRepo) {
        this.gameRepo = gameRepo;
    }

    async execute(game, userId) {
        return await this.gameRepo.create(game, userId)
    }
}