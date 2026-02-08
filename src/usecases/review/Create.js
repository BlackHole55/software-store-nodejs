export class CreateReviewUC {
    constructor(reviwRepo, userRepo) {
        this.reviwRepo = reviwRepo;
        this.userRepo = userRepo;
    }

    async execute(reviewData) {
        const user = await this.userRepo.getById(reviewData.user_id.toString());
        if (!user) throw new Error("User not found");

        reviewData.username = user.username;

        const ownsGame = user.library.some(
            (libGame) => libGame.game_id.toString() === reviewData.game_id.toString()
        );

        if (!ownsGame) {
            throw new Error("Review denied: you must own the game to leave a review")
        }

        return await this.reviwRepo.create(reviewData);
    }
}