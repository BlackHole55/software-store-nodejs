export class DeleteReviewUC {
    constructor(reviewRepo) {
        this.reviewRepo = reviewRepo;
    }

    async execute(id, userId, userRole) {
        const existingReview = await this.reviewRepo.getById(id);
        if (!existingReview) throw new Error("Review not found");

        if (existingReview.user_id.toString() !== userId && userRole !== "admin") {
            throw new Error("Permission denied: you can only delete your own reviews");
        }

        return await this.reviewRepo.delete(id);
    }
}