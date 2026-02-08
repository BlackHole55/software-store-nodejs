import mongoose from "mongoose";
import { GameModel } from "../models/GameModel.js";

export class GameRepository {
    async create(game, userId) {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("Invalid User ID format");
        }

        const gameData = {
            ...game,
            user_id: userId
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
        const verifiedGames = await GameModel.find({ is_verified: true }).lean();

        return verifiedGames.map(game => ({
            ...game,
            id: game._id.toString(),
        }));
    }

    async getById(id){
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid ID format");
        }

        const game = await GameModel.findById(id)
        .populate("publisher", "name")
        .populate("developer", "name")
        .populate("emulation")
        .lean(); 

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

        const games = await GameModel.find({ user_id: userId }).lean();

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
        ).lean();

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
                    is_verified: true,
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
                    is_verified: false,
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
            is_verified: true,
            title: titleRegex
        }).lean();

        return games.map(game => ({
            ...game,
            id: game._id.toString(),
        }));
    }
}