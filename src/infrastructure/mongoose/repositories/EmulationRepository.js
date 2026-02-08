import mongoose from "mongoose";
import { EmualtionModel } from "../models/EmulationModel.js";

export class EmulationRepository {
    async create(emulation) {
        const emulationData = {
            ...emulation
        }

        await EmualtionModel.create(emulationData);
    }

    async getAll() {
        const emulations = await EmulationModel.find({}).lean();

        return emulations.map(emulation => ({
            ...emulation,
            id: emulation._id.toString()
        }));
    }
   
    async getById(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid ID format");
        }

        const emulation = await EmualtionModel.findById(id).lean();

        if (!emulation) {
            return null;
        }

        return {
            ...emulation,
            id: emulation._id.toString(),
        };
    }

    async update(id,updatedEmulation) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid ID format");
        }

        const result = await EmualtionModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    ...updatedEmulation,
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

        const result = await EmualtionModel.findByIdAndDelete(id);

        if (!result) {
            throw new Error("Not Found");
        }
    }
    
}