import mongoose from "mongoose";
import { GameModel } from "../models/GameModel.js";

export class GameRepository {
    async create(game, userId) {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("Invalid User ID format");
        }

        const gameData = {
            ...game,
            userId: userId
        }

        await GameModel.create(gameData);
    }

    async getAll() {
        const games = await GameModel.find({}).lean();
        
        return games.map(game => ({
            ...game,
            id: game._id.toString(),
        }));
    }

    async getAllVerified() {
        const verifiedGames = await GameModel.find({ isVerified: true }).lean();
        
        return verifiedGames.map(game => ({
            ...game,
            id: game._id.toString(),
        }));
    }

    async getById(id){
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid ID format");
        }

        const game = await GameModel.findById(id).lean(); 

        if (!game) return null;

        return {
            ...game,
            id: game._id.toString(),
        }
    }

    async getByIds(ids) {
        const validObjectIds = ids
            .filter(id => mongoose.Types.ObjectId.isValid(id))
            .map(id => new mongoose.Types.ObjectId(id));
        
        const games = await GameModel.find({
            _id: { $in: validObjectIds }
        }).lean();

        return games.map(game => ({
            ...game,
            id: game._id.toString(),
        }));
    }

    async getByUserId(userId){
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("Invalid User ID format");
        }

        const games = await GameModel.find({ userId: userId }).lean();

        return games.map(game => ({
            ...game,
            id: game._id.toString(),
        }));
    }

    async update(id, updates){
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid ID format");
        }

        const result = await GameModel.findByIdAndUpdate(
            id,
            { $set: updates },
            { runValidators: true }
        );

        if (!result) {
            throw new Error("Not Found");
        }
    }

    async delete(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid ID format");
        }

        const result = await GameModel.findByIdAndDelete(id);

        if (!result) {
            throw new Error("Not Found");
        }
    }

    async verify(id) {
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

    async unverify(id){
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

    async searchByTitle(title) {
        const titleRegex = new RegExp(title, 'i');

        const games = await GameModel.find({
            isVerified: true,
            title: titleRegex
        }).lean();

        return games.map(game => ({
            ...game,
            id: game._id.toString(),
        }));
    }
}