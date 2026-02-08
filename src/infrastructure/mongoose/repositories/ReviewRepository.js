import { ReviewModel } from "../models/ReviewModel";

export class ReviewRepository {
    constructor() {
        this.model = ReviewModel;
    }

    async create(reviewData) {
        const review = new this.model(reviewData);
        return await review.save();
    }

    async getAll() {
        return await this.model.find({}).lean();
    }

    async getById() {
        const review = await this.model.findById(id).lean();
        if (!review) {
            throw new Error("Review not found");
        }
        return review;
    }

    async getByGameId(gameId) {
        return await this.model.find({ game_id: gameId }).lean();
    }

    async update(id, updateReviewData) {
        const updated = await this.model.findByIdAndUpdate(
            id,
            { $set: updateReviewData },
            { new: true, runValidators: true }
        ).lean();

        if (!updated) {
            throw new Error("Review not found");
        }

        return updated;
    }

    async delete(id) {
        const result = await this.model.findByIdAndDelete(id);
        if (!result) {
            throw new Error("Review not found");
        }
        return result;
    }
}