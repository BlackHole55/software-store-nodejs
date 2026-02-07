import mongoose, { Schema } from "mongoose";

const ItemSchema = new Schema({
    game_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Game'
    },
    price_at: {
        type: Number,
        required: true,
        min: 0
    }
}, { _id: false });

const PaymentSchema = new Schema({
    payment_method: {
        type: String,
        required: true
    },
    payment_status: {
        type: String,
        default: 'pending'
    },
    paid_at: {
        type: Date,
        default: Date.now
    }
}, { _id: false })

const PurchaseSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            required: [true, 'User ID is required'],
            ref: 'User'
        },
        total_amount: {
            type: Number,
            required: [true, 'Total amount is required'],
            min: 0
        },
        items: {
            type: [ItemSchema],
            validate: [val => val.length > 0, 'Purchase must have at least one item']
        },
        payment: {
            type: PaymentSchema,
            reqired: true
        }
    }, {
        timestamps: { 
            createdAt: 'created_at', 
            updatedAt: 'updated_at' 
        },
    }
);

export const Purchase = mongoose.model('Purchase', PurchaseSchema, 'purchases');