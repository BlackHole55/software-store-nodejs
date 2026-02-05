import type { Game } from "../entities/Game.js";

export interface IGameRepository {
    create(game: Game, userId: string): Promise<void>;
    
    getAll(): Promise<Game[]>;

    getAllVerified(): Promise<Game[]>;

    getById(id: string): Promise<Game | null>

    getByIds(ids: string[]): Promise<Game[]>;

    getByUserId(userId: string): Promise<Game[]>;

    update(id: string, updates: Partial<Game>): Promise<void>;

    delete(id: string): Promise<void>;

    verify(id: string): Promise<void>;

    unverify(id: string): Promise<void>;

    searchByTitle(title: string): Promise<Game[]>;
}