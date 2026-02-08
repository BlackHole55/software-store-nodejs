export class GetAllVerifiedGamesUseCase {
    constructor(gameRepo) {
        this.gameRepo = gameRepo;
    }

    async execute() {
        const games = await this.gameRepo.getAllVerified();

        return games;
    }
}