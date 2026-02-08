export class GetAllReviewUC {
    constructor(reviwRepo) {
        this.reviwRepo = reviwRepo;
    }

    async execute() {
        return await this.reviwRepo.getAll();
    }
}