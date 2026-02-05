import mongoose, { Schema, Document, SchemaType } from "mongoose";
import type { Game } from "../../../domain/entities/Game.js";

export interface GameDocument extends Omit<Game, 'id'>, Document {}

const GameSchema = new Schema<GameDocument>(
    {
        publisherId: {
            // Use the 'as any' shortcut to align with the string interface
            type: Schema.Types.ObjectId as any,
            required: [true, 'Publisher ID is required'],
            ref: 'Publisher'
        },
        developerId: { 
            type: Schema.Types.ObjectId as any, 
            required: [true, 'Developer ID is required'], 
            ref: 'Developer' 
        },
        emulationId: { 
            type: Schema.Types.ObjectId, 
            ref: 'Emulation' 
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        originalSystem: {
            type: String,
            maxLength: 250
        },
        title: { 
            type: String, 
            required: true, 
            minlength: 2, 
            maxlength: 100 
        },
        description: { 
            type: String, 
            maxlength: 1000 
        },
        releaseDate: { 
            type: Date 
        },
        price: { 
            type: Number, 
            required: true, 
            min: 0 
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        category: [{
            type: String
        }],
    },
    {
        timestamps: true
    }
)

export const GameModel = mongoose.model<GameDocument>('Game', GameSchema, 'games');