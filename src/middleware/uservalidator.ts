import { z } from 'zod';
import { validate } from '@lib/validate';

const dataSchema = z.object({
  name: z.string({
    required_error: 'Full name is required',
  }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Not a valid email'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .trim()
    .min(8, 'Password must be greater then 8 character'),
});

export const validateUserCreate = validate(dataSchema);
