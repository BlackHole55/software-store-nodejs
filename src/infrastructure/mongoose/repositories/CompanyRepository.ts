import mongoose from "mongoose";
import type { Company } from "../../../domain/entities/Company.js";
import { CompanyModel } from "../models/CompanyModel.js";
import type { ICompanyRepository } from "../../../domain/repositories/ICompanyRepository.js";


export class CompanyRepository implements ICompanyRepository{
        async create(company: Company): Promise<void> {
            const companyData = {
                ...company
            }
    
            await CompanyModel.create(companyData);
        }
    
        async getAll(): Promise<Company[]> {
            return await CompanyModel.find({}).lean();
        }
    
        async getAllVerified(): Promise<Company[]> {
            return await CompanyModel.find({ is_verified: true }).lean();
        }
    
        async getById(id: string): Promise<Company | null> {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error("Invalid ID format");
            }
    
            return await CompanyModel.findById(id).lean();
        }
    
        async update(id: string, updates: Partial<Company>): Promise<void> {
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
    
        async delete(id: string): Promise<void> {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error("Invalid ID format");
            }
    
            const result = await CompanyModel.findByIdAndDelete(id);
    
            if (!result) {
                throw new Error("Not Found");
            }
        }

}