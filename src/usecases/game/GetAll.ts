import type { IGameRepository } from "../../domain/repositories/IGameRepository.js";
import type { Game } from "../../domain/entities/Game.js";

export class GetAllGamesUseCase {
    constructor(private gameRepo: IGameRepository) {}

    async execute(): Promise<Game[]> {
        const games = await this.gameRepo.getAll();

        if (!games || games.length == 0) {
            throw new Error("No games found");
        }

        return games;
    }
}