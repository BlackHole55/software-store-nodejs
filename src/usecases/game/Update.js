export class CreateGameUseCase {
    constructor(gameRepo) {
        this.gameRepo = gameRepo;
    }

    async execute(id, game, userId, userRole) {
        const existingGame = await this.gameRepo.getById(id);
        if (!existingGame) {
            throw new Error("Game not found");
        }

        if (userRole !== "admin" && existingGame.userId.toString() !== userId) {
            throw new Error("Permission denied: you are not the owner of this game");
        }

        const finalUpdateData = {
            ...game,
            updatedAt: new Date(),
            isVerified: false // Reset verification status after any edit
        };

        if (updates.category) {
            finalUpdateData.category = [...new Set(updates.category)]; 
        }

        return await this.gameRepo.update(id, finalUpdateData)
    }
}