import { Schema, model, Document } from 'mongoose';
import type { User } from '../../../domain/entities/User.js';


export interface UserDocument extends Omit<User, 'id'>, Document {}

const userSchema = new Schema<UserDocument>(
  {
    username: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true 
    },
    password: { 
      type: String, 
    },
    role: { 
      type: String, 
      enum: ['user', 'admin'], 
      default: 'user' 
    },
    library: [
      {
        game_id: { type: Schema.Types.ObjectId, ref: 'Game' },
        added_at: { type: Date, default: Date.now },
        playtime_hours: { type: Number, default: 0 }
      }
    ]},
    { 
    timestamps: { 
      createdAt: 'created_at', 
      updatedAt: 'updated_at' 
    }
  }
);

export const UserModel = model<UserDocument>('User', userSchema,'users');