export class DeletePurchaseUseCase {
    constructor(purchaseRepo) {
        this.purchaseRepo = purchaseRepo;
    }

    async execute(id) {
        return await this.purchaseRepo.delete(id);
    }
}