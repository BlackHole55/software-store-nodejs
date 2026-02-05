import mongoose from "mongoose";
import type { User } from "../../../domain/entities/User.js";
import { UserModel } from "../models/UserModel.js";
import type { IUserRepository } from "../../../domain/repositories/IUserRepository.js";

export class UserRepository implements IUserRepository {

    async getByEmail(email: string): Promise<User | null> {
        return await UserModel.findOne({ email }).lean();
    }

    async create(user: User): Promise<void> {
        await UserModel.create(user);
    }

    async getAll(): Promise<User[]> {
        return await UserModel.find({}).lean();
    }

    async getById(id: string): Promise<User | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid ID format");
        }

        return await UserModel.findById(id).lean();
    }

    async update(id: string, updates: Partial<User>): Promise<void> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid ID format");
        }

        const result = await UserModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    ...updates,
                    updated_at: new Date()
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

        const result = await UserModel.findByIdAndDelete(id);

        if (!result) {
            throw new Error("Not Found");
        }
    }
}