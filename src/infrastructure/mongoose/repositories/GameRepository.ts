import mongoose from "mongoose";
import type { IGameRepository } from "../../../domain/repositories/IGameRepository.js";
import type { Game } from "../../../domain/entities/Game.js";
import { GameModel } from "../models/GameModel.js";

export class GameRepository implements IGameRepository {
    async create(game: Game, userId: string): Promise<void> {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("Invalid User ID format");
        }

        const gameData = {
            ...game,
            userId: userId
        }

        await GameModel.create(gameData);
    }

    async getAll(): Promise<Game[]> {
        return await GameModel.find({}).lean();
    }

    async getAllVerified(): Promise<Game[]> {
        return await GameModel.find({ isVerified: true }).lean();
    }

    async getById(id: string): Promise<Game | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid ID format");
        }

        return await GameModel.findById(id).lean();
    }

    async getByIds(ids: string[]): Promise<Game[]> {
        const validObjectIds = ids
            .filter(id => mongoose.Types.ObjectId.isValid(id))
            .map(id => new mongoose.Types.ObjectId(id));
        
        const games = await GameModel.find({
            _id: { $in: validObjectIds }
        }).lean();

        return games as Game[];
    }

    async getByUserId(userId: string): Promise<Game[]> {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("Invalid User ID format");
        }

        return await GameModel.find({ userId: userId }).lean();
    }

    async update(id: string, updates: Partial<Game>): Promise<void> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid ID format");
        }

        const result = await GameModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    ...updates,
                    updatedAt: new Date()
                }
            },
            { runValidators: true }
        );

        if (!result) {
            throw new Error("Not Found");
        }
    }

    async delete(id: string): Promise<void> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid ID format");
        }

        const result = await GameModel.findByIdAndDelete(id);

        if (!result) {
            throw new Error("Not Found");
        }
    }

    async verify(id: string): Promise<void> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid ID format");
        }

        const result = await GameModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    isVerified: true,
                    updatedAt: new Date()
                }
            },
            { runValidators: true }
        ).lean();

        if (!result) {
            throw new Error("Not Found");
        }
    }

    async unverify(id: string): Promise<void> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid ID format");
        }

        const result = await GameModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    isVerified: false,
                    updatedAt: new Date()
                }
            },
            { runValidators: true }
        );

        if (!result) {
            throw new Error("Not Found");
        }
    }

    async searchByTitle(title: string): Promise<Game[]> {
        const titleRegex = new RegExp(title, 'i');

        const games = await GameModel.find({
            isVerified: true,
            title: titleRegex
        }).lean();

        return games as Game[]
    }
}