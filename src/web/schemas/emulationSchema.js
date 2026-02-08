import { z } from 'zod';

export const createEmulationSchema = z.object({
  name: z.string()
});

export const updateEmulationSchema = z.object({
  name: z.string().optional()
});