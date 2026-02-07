import { z } from 'zod';

export const createPurchaseSchema = z.object({
    user_id: z.string(),        

    items: z.array(z.object({
        game_id: z.string(),
        price_at: z.number().positive("Price must be greater than 0")
    })).min(1, "Purchase must contain at least one item"),

    total_amount: z.number().min(0),

    payment: z.object({
        payment_method: z.string(),
        payment_status: z.string(),
        paid_at: z.coerce.date().optional()
    })
});