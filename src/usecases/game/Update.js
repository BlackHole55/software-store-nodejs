export class UpdateGameUseCase {
    constructor(gameRepo) {
        this.gameRepo = gameRepo;
    }

    async execute(id, game, userId, userRole) {
        const existingGame = await this.gameRepo.getById(id);
        if (!existingGame) {
            throw new Error("Game not found");
        }

        if (userRole !== "admin" && existingGame.user_id.toString() !== userId) {
            throw new Error("Permission denied: you are not the owner of this game");
        }

        const finalUpdateData = {
            ...game,
            isVerified: false // Reset verification status after any edit
        };

        // Deduplicate
        if (game.category) {
            finalUpdateData.category = [...new Set(game.category)]; 
        }

        return await this.gameRepo.update(id, finalUpdateData)
    }
}