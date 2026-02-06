export class GetByIdGameUseCase {
    constructor(gameRepo) {
        this.gameRepo = gameRepo;
    }

    async execute(id) {
        const game = await this.gameRepo.getById(id);
        if (!game) {
            throw new Error(`Game with ID ${id} not found`);
        }

        return game;
    }
}