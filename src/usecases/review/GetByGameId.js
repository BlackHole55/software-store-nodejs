export class GetByGameIdReviewUC {
    constructor(reviewRepo, gameRepo) {
        this.reviewRepo = reviewRepo;
        this.gameRepo = gameRepo;
    }

    async execute(gameId) {
        const game = await this.gameRepo.getById(gameId);
        if (!game) {
            throw new Error("Game not found");
        }

        return await this.reviewRepo.getByGameId(gameId);
    }
}