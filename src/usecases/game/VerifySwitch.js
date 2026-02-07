export class VerifySwitchUseCase {
    constructor(gameRepo) {
        this.gameRepo = gameRepo;
    }

    async execute(id) {
        const game = await this.gameRepo.getById(id);
        if (!game) {
            throw new Error(`Game not found`);
        }

        if (game.is_verified) {
            return await this.gameRepo.unverify(id);
        }

        return await this.gameRepo.verify(id);
    }
}