export class GetGameStatsUseCase {
    constructor(gameRepo) {
        this.gameRepo = gameRepo;
    }

    async execute() {
        return await this.gameRepo.getStats();
    }
}