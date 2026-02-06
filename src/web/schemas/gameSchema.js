import { z } from 'zod';

export const gameSchema = z.object({
    body: z .object({
        publisher_id: z.string(),
        developer_id: z.string(),
        emulation_id: z.string().optional(),
        user_id: z.string().optional(),
        title: z.string(),
        description: z.string().optional(),
        original_system: z.string(),
        release_date: z.string().optional(),
        price: z.number().positive(),
        is_verified: z.boolean().default(false)
    })
});