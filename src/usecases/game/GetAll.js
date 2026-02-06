export class GetAllGamesUseCase {
    constructor(gameRepo) {
        this.gameRepo = gameRepo;
    }

    async execute() {
        const games = await this.gameRepo.getAll();

        if (!games || games.length == 0) {
            throw new Error("No games found");
        }

        return games;
    }
}