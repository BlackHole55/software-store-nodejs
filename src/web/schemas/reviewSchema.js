import { z } from 'zod';

export const createReviewSchema = z.object({
    user_id: z.string(),
    username: z.string().min(1, "Username is required"),    
    game_id: z.string(),
    
    rating: z.number({
      required_error: "Rating is required",
      invalid_type_error: "Rating must be a number",
    }).int().min(1).max(5),
    
    content: z.string().default(""),
});

export const updateReviewSchema = z.object({
    user_id: z.string().optional(),
    username: z.string().min(1).optional(),    
    game_id: z.string().optional(),
    
    rating: z.number({
      invalid_type_error: "Rating must be a number",
    }).int().min(1).max(5).optional(),
    
    content: z.string().optional(),
}).strict();