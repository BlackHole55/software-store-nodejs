import { Schema, model, Document } from 'mongoose';
import type { Company } from '../../../domain/entities/Company.js';

export interface CompanyDocument extends Omit<Company, 'id'>, Document {}

const companySchema = new Schema<CompanyDocument>(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },
    description: { 
      type: String, 
      default: "" 
    },
    country: { 
      type: String, 
      required: true 
    },
    contacts: {
      email: { type: String, lowercase: true, trim: true },
      phone: { type: String, trim: true },
      website: { type: String, trim: true }
    },
    is_verified: { 
      type: Boolean, 
      default: false 
    },
  },
  { 
    timestamps: false, 
    versionKey: false 
  }
);

export const CompanyModel = model<CompanyDocument>('Company', companySchema, 'companies');