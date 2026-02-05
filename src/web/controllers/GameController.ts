import type { Request, Response } from 'express';
import { CreateGameUseCase } from '../../usecases/game/CreateGame.js';

export class GameController {
    constructor(
        private createGameUC: CreateGameUseCase
    ){}

    async handleCreate(req: Request, res: Response) {
        try {
            const gameData = req.body;
            // TODO: implement authentification
            // const userId = req.headers
            const userId = (req as any).user.id;

            await this.createGameUC.execute(gameData, userId);

            return res.status(201).json({ message: "Game created successfuly" });
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }
}