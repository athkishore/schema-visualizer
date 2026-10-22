import { parseZodSchema } from "./parsers/zod";
import { validatePayload } from "./validator";
import { z } from 'zod';

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

const user = {
  username: 'abc',
  name: 'ABC',
  address: {
    houseNumber: 0,
    building: 'abc',
    street: 'ABC',
    city: 'xyz',
    pin: 123,
  },
  phones: [],
  version: 5,
};

const userSchema_IR = parseZodSchema(userSchema);
console.log(validatePayload(userSchema_IR, user));