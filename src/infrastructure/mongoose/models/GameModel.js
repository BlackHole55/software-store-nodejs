import mongoose, { Schema, Document, SchemaType } from "mongoose";

const GameSchema = new Schema(
    {
        publisher_id: {
            type: Schema.Types.ObjectId,
            required: [true, 'Publisher ID is required'],
            ref: 'Publisher'
        },
        developer_id: { 
            type: Schema.Types.ObjectId, 
            required: [true, 'Developer ID is required'], 
            ref: 'Developer'
        },
        emulation_id: { 
            type: Schema.Types.ObjectId, 
            ref: 'Emulation',
            required: false,
            set: v => v === '' ? undefined : v
        },
        user_id: {
            type: Schema.Types.ObjectId,
            required: [true, 'User ID is required'],
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

export const GameModel = mongoose.model('Game', GameSchema, 'games');