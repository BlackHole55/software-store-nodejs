import { Schema, model } from 'mongoose';


const companySchema = new Schema(
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
      email: { type: String, trim: true },
      phone: { type: String, trim: true },
      website: { type: String, trim: true }
    },
    is_verified: { 
      type: Boolean, 
      default: false 
    },
  },
  { 
    timestamps: { 
      createdAt: 'created_at', 
      updatedAt: 'updated_at' 
    }
  }
);

export const CompanyModel = model('Company', companySchema, 'companies');