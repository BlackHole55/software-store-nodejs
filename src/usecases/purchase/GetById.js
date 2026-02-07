export class GetByIdPurchaseUseCase {
    constructor(purchaseRepo) {
        this.purchaseRepo = purchaseRepo
    }

    async execute(id) {
        return await this.purchaseRepo.getById(id);
    }
}