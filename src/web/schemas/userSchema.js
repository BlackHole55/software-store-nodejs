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

export const paramsIdSchema = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Неверный формат ID")
});

export const updateUserSchema = z.object({
    username: z.string().min(3).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    role: z.enum(['user', 'moderator', 'admin']).optional(),
    library: z.array(
        z.object({
          game_id: z.string(), 
          added_at: z.string().datetime().optional(), 
          playtime_hours: z.number().min(0).default(0)
        })
      ).optional()
});