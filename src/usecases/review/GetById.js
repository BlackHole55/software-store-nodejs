export class GetByIdReviewUC {
    constructor(reviwRepo) {
        this.reviwRepo = reviwRepo;
    }

    async execute(id) {
        return await this.reviwRepo.getById(id);
    }
}