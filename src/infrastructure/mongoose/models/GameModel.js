import mongoose, { Schema } from "mongoose";

const GameSchema = new Schema(
    {
        publisher_id: {
            type: Schema.Types.ObjectId,
            required: [true, 'Publisher ID is required'],
            ref: 'Company'
        },
        developer_id: { 
            type: Schema.Types.ObjectId, 
            required: [true, 'Developer ID is required'], 
            ref: 'Company'
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

GameSchema.virtual('publisher', {
    ref: 'Company',
    localField: 'publisher_id',
    foreignField: '_id',
    justOne: true
});

GameSchema.virtual('developer', {
    ref: 'Company',
    localField: 'developer_id',
    foreignField: '_id',
    justOne: true
});

GameSchema.virtual('emulation', {
    ref: 'Emulation',
    localField: 'emulation_id',
    foreignField: '_id',
    justOne: true
});

export const GameModel = mongoose.model('Game', GameSchema, 'games');