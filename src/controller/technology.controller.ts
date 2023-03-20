/* eslint-disable camelcase */
import { NextFunction, Response, Request } from 'express';
import db from '@lib/db';
import successResponse from '@utils/sucessResponse';

export const createTechnology = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, image_url } = req.body;

  db.query(
    `INSERT INTO technologies(name, image_url) VALUES ('${name}', '${image_url}');`,
    err => {
      if (err) {
        return next(err);
      }

      return successResponse({
        res,
        statusCode: 201,
        msg: 'Technology created successfully',
      });
    }
  );
};
