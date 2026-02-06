import mongoose from "mongoose";
import { UserModel } from "../models/UserModel.js";

export class UserRepository {

    async getByEmail(email) {
        const user = await UserModel.findOne({ email }).select('+password').lean()

        if (!user) return null;

        return {
            ...user,
            id: user._id.toString(),
        };
    }

    async create(user) {
        const userData = {
            ...user,
        }

        return await UserModel.create(userData);
    }

    async getAll() {
        const users = await UserModel.find({}).lean();
    
        return users.map(user => ({
            ...user,
            id: user._id.toString(),
        }));
    }

    async getById(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid ID format");
        }
        const user = await UserModel.findById(id).lean();

        if (!user) return null;

        return {
            ...user,
            id: user._id.toString(),
        } ;
    }

    async update(id, updatedUser) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid ID format");
        }

        const result = await UserModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    ...updatedUser,
                    updated_at: new Date()
                }
            },
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

        const result = await UserModel.findByIdAndDelete(id);

        if (!result) {
            throw new Error("Not Found");
        }
    }
}