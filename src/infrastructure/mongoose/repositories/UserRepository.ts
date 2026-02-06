import mongoose from "mongoose";
import type { User } from "../../../domain/entities/User.js";
import { UserModel } from "../models/UserModel.js";
import type { IUserRepository } from "../../../domain/repositories/IUserRepository.js";

export class UserRepository implements IUserRepository {

    async getByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ email }).lean()

        if (!user) return null;

        return {
            ...user,
            id: user._id.toString(),
        };
    }

    async create(user: User): Promise<void> {
        await UserModel.create(user);
    }

    async getAll(): Promise<User[]> {
        const users = await UserModel.find({}).lean();
    
        return users.map(user => ({
            ...user,
            id: user._id.toString(),
        })) as User[];
    }

    async getById(id: string): Promise<User | null> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid ID format");
        }
        const user = await UserModel.findById(id).lean();

        if (!user) return null;

        return {
            ...user,
            id: user._id.toString(),
        } as User;
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