import type { IGameRepository } from "../../domain/repositories/IGameRepository.js";
import type { Game } from "../../domain/entities/Game.js";

export class GetByIdGameUseCase {
    constructor(private gameRepo: IGameRepository) {}

    async execute(id: string): Promise<Game> {
        const game = await this.gameRepo.getById(id);
        if (!game) {
            throw new Error(`Game with ID ${id} not found`);
        }

        return game;
    }
}