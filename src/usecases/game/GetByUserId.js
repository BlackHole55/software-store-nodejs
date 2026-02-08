export class GetByUserIdGameUseCase {
    constructor(gameRepo) {
        this.gameRepo = gameRepo;
    }

    async execute(userId) {
        const games = await this.gameRepo.getByUserId(userId);

        return games;
    }
}