import { z } from 'zod';

export const userSchema = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(['user', 'moderator','admin']).default('user'),
    library: z.array(
        z.object({
          game_id: z.string(), 
          added_at: z.string().datetime().optional(), 
          playtime_hours: z.number().min(0).default(0)
        })
      ).optional()
});