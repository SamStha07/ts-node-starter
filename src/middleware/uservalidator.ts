/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, z } from 'zod';

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

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      let err = error;
      if (err instanceof z.ZodError) {
        err = err.issues.map(e => ({ path: e.path[0], message: e.message }));
      }
      return res.status(409).json({
        status: 'failed',
        error: err,
      });
    }
  };

export const validateUserCreate = validate(dataSchema);
