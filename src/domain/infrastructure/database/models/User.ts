import { Schema, model, Document } from 'mongoose';
import type { User } from '../../../entities/User.js';

const userSchema = new Schema<User>(
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
    ],
    createdAt: { type: Date, default: Date.now }
  },
  { 
    timestamps: false, 
    versionKey: false 
  }
);

userSchema.add({
  updatedAt: { type: Date, default: null }
});

export const UserModel = model<User>('User', userSchema);