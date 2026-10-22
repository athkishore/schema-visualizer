import { z } from 'zod';
import { parseZodSchema } from './zod';

const userSchema = z.object({
  username: z.string().email(),
  name: z.string(),
  firstName: z.string().optional(),
  address: z.object({
    houseNumber: z.number(),
    building: z.string(),
    street: z.string(),
    city: z.string(),
    pin: z.number(),
  }),
  phones: z.object({
    number: z.number(),
  }).array(),
  version: z.number().max(4),
});

console.dir(parseZodSchema(userSchema), { depth: null });