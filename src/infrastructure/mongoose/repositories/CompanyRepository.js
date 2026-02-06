import mongoose from "mongoose";
import { CompanyModel } from "../models/CompanyModel.js";


export class CompanyRepository {
        async create() {
            const companyData = {
                ...company
            }
    
            await CompanyModel.create(companyData);
        }
    
        async getAll() {
            const companies = await CompanyModel.find({}).lean();

            return companies.map(company => ({
                ...company,
                id: company._id.toString(),
            }));
        }
    
        async getAllVerified() {
            const companies = await CompanyModel.find({ is_verified: true }).lean();

            return companies.map(company =>({
                ...company,
                id: company._id.toString(),
            }))
        }
    
        async getById() {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error("Invalid ID format");
            }
    
            const company = await CompanyModel.findById(id).lean();

            if (!company) {
                return null;
            }

            return {
                ...company,
                id: company._id.toString(),
            };
        }
    
        async update() {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error("Invalid ID format");
            }
    
            const result = await CompanyModel.findByIdAndUpdate(
                id,
                {
                    $set: {
                        ...updates,
                        updated_at: new Date()
                    }
                },
                { runValidators: true }
            );
    
            if (!result) {
                throw new Error("Not Found");
            }
        }
    
        async delete() {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error("Invalid ID format");
            }
    
            const result = await CompanyModel.findByIdAndDelete(id);
    
            if (!result) {
                throw new Error("Not Found");
            }
        }

}