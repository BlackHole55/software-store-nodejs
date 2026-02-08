export class UpdateReviewUC {
    constructor(reviewRepo) {
        this.reviewRepo = reviewRepo;
    }

    async execute(id, userId, updateData) {
        const existingReview = await this.reviewRepo.getById(id);
        if (!existingReview) throw new Error("Review not found");

        if (existingReview.user_id.toString() !== userId) {
            throw new Error("Permission denied: you can only edit your own reviews");
        }

        const finalUpdate = {
            rating: updateData.rating ?? existingReview.rating,
            content: updateData.content ?? existingReview.content
        };

        return await this.reviewRepo.update(id, finalUpdate);
    }
}