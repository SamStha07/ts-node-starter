/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import successResponse from '@utils/sucessResponse';
import { CustomRequestWithUser } from '@type/user.types';
import AppError from '@utils/appError';
import db from '@lib/db';

export const createProject = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req as CustomRequestWithUser;

  const { name, description } = req.body;

  if (!user) {
    return next(new AppError('user not found', 404));
  }

  db.query(
    `INSERT INTO projects(name, description, user_id) VALUES ('${name}', '${description}', ${user.id});`,
    err => {
      if (err) {
        return next(err);
      }

      return successResponse({
        res,
        statusCode: 201,
        msg: 'project created successfully',
      });
    }
  );
};

export const getCurrentUserPojectsList = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req as CustomRequestWithUser;

  // if (Number(user.id) !== Number(id)) {
  //   return next(new AppError(`User with id ${id} not found`, 404));
  // }

  db.query(
    `SELECT * FROM projects WHERE user_id = ?`,
    [user.id],
    (err, results) => {
      if (err) {
        return next(err);
      }

      console.log('results', results);

      return successResponse({
        res,
        statusCode: 200,
        data: results,
      });
    }
  );
};
