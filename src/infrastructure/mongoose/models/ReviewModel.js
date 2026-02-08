import mongoose, { Schema } from 'mongoose';

const ReviewSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    game_id: {
        type: Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    content: {
        type: String,
        default: ""
    }
}, { 
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export const ReviewModel = mongoose.model('Review', ReviewSchema, 'reviews');