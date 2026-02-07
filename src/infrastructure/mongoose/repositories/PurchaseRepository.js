import { PurchaseModel } from "../models/PurchaseModel.js";

export class PurchaseRepository {
    constructor() {
        this.model = PurchaseModel;
    }

    async create(purchaseData) {
        const purchase = new this.model(purchaseData);
        return await purchase.save();
    }

    async getAll() {
        return await this.model.find({}).lean();
    }

    async getById(id) {
        const purchase = await this.model.findById(id).lean();
        if (!purchase) {
            throw new Error("Purchase not found");
        }
        return purchase;
    }

    async delete(id) {
        const result = await this.model.findByIdAndDelete(id).lean();
        if (!result) {
            throw new Error("Purchase not found");
        }
        return result;
    }
}