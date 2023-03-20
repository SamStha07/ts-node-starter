import { z } from 'zod';
import { validate } from '@lib/validate';

const dataSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  image_url: z.string({
    required_error: 'Image is required',
  }),
});

export const validateTechnologyCreate = validate(dataSchema);
