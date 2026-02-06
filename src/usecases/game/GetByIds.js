export class GetByIdsGameUseCase {
    constructor(gameRepo) {
        this.game = gameRepo;
    }

    async execute(id) {
        const games = await this.gameRepo.getByIds(id);

        if (!games || games.length == 0) {
            throw new Error("No games found");
        }

        return games;
    }
}