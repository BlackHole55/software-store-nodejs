export class GetAllVerifiedGamesUseCase {
    constructor(gameRepo) {
        this.gameRepo = gameRepo;
    }

    async execute() {
        const games = await this.gameRepo.getAllVerified();

        if (!games || games.length == 0) {
            throw new Error("No games found");
        }

        return games;
    }
}