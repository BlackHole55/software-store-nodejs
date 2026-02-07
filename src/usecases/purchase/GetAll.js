export class GetAllPurchaseUseCase {
    constructor(purchaseRepo) {
        this.purchaseRepo = purchaseRepo
    }

    async execute() {
        return await this.purchaseRepo.getAll();
    }
}