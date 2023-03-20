/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, z } from 'zod';

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    console.log('req', req);

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
