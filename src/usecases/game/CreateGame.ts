import type { IGameRepository } from "../../domain/repositories/IGameRepository.js";
import type { Game } from "../../domain/entities/Game.js";

export class CreateGameUseCase {
    constructor(private gameRepo: IGameRepository) {}

    async execute(game: Game, userId: string): Promise<void> {
        game.createdAt = new Date();

        return await this.gameRepo.create(game, userId)
    }
}