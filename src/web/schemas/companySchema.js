import { z } from 'zod';
export const companySchema = z.object({
    body: z .object({
        name: z.string(),
        description: z.string().optional(),
        country: z.string().optional(),
        contacts: z.array(
            z.object({
                email: z.string(),
                phone: z.string(),
                website: z.string()
            })
        ).optional(),
        is_verified: z.boolean().default(false),
        library: z.array(
        z.object({
            game_id: z.string(), 
            added_at: z.string().datetime().optional(), 
            playtime_hours: z.number().min(0).default(0)
        })).optional()
    })
})