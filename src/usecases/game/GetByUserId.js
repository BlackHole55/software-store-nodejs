export class GetByUserIdGameUseCase {
    constructor(gameRepo) {
        this.game = gameRepo;
    }

    async execute(userId) {
        const games = await this.gameRepo.getByUserId(userId);

        if (!games || games.length == 0) {
            throw new Error("No games found");
        }

        return games;
    }
}