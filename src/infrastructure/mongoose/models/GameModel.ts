import mongoose, { Schema, Document, SchemaType } from "mongoose";
import type { Game } from "../../../domain/entities/Game.js";

export interface GameDocument extends Omit<Game, 'id'>, Document {}

const GameSchema = new Schema<GameDocument>(
    {
        publisher_id: {
            // Use the 'as any' shortcut to align with the string interface
            type: Schema.Types.ObjectId as any,
            required: [true, 'Publisher ID is required'],
            ref: 'Publisher'
        },
        developer_id: { 
            type: Schema.Types.ObjectId as any, 
            required: [true, 'Developer ID is required'], 
            ref: 'Developer'
        },
        emulation_id: { 
            type: Schema.Types.ObjectId, 
            ref: 'Emulation' 
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        original_system: {
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
        release_date: { 
            type: Date 
        },
        price: { 
            type: Number, 
            required: true, 
            min: 0 
        },
        is_verified: {
            type: Boolean,
            default: false
        },
        category: [{
            type: String
        }],
    },
    {
        timestamps: { 
            createdAt: 'created_at', 
            updatedAt: 'updated_at' 
        }
    }
)

export const GameModel = mongoose.model<GameDocument>('Game', GameSchema, 'games');