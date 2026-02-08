export class SearchByTitleGameUseCase {
    constructor(gameRepo) {
        this.gameRepo = gameRepo;
    }

    async execute(title) {
        const games = await this.gameRepo.searchByTitle(title);

        return games;
    }
}