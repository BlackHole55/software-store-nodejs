import { z } from 'zod';

export const createGameSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    price: z.number().min(0),
    publisher_id: z.string().regex(/^[0-9a-fA-F]{24}$/),
    developer_id: z.string().regex(/^[0-9a-fA-F]{24}$/),
    emulation_id: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
    category: z.array(z.string()).optional(),
    original_system: z.string(),
    release_date: z.string().optional(),
    is_verified: z.boolean().default(false)
}).strict();

export const updateGameSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    price: z.number().min(0).optional(),
    publisher_id: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
    developer_id: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
    emulation_id: z.string().regex(/^[0-9a-fA-F]{24}$/).optional(),
    category: z.string().optional(),
    original_system: z.string().optional(),
    release_date: z.preprocess((arg) => {
        if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
    }, z.date().optional()),
}).strict();