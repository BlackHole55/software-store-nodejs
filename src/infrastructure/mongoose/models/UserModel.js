import { Schema, model, Document } from 'mongoose';

const userSchema = new Schema(
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
      select: false
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

export const UserModel = model('User', userSchema,'users');