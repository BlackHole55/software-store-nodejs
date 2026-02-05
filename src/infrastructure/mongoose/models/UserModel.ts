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
    password_hash: { 
      type: String, 
      required: true 
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
        timestamps: true
    }
);

userSchema.add({
  updatedAt: { type: Date, default: null }
});

export const UserModel = model<UserDocument>('User', userSchema,'users');