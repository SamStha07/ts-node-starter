/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '@utils/appError';
import db from '@lib/db';
import { CustomRequestWithUser, IUser } from '@type/user.types';

interface CustomPayload extends JwtPayload {
  id: number;
}

export const checkToken = (req: Request, _: Response, next: NextFunction) => {
  const authcookie = req.cookies.authCookie;

  console.log('authcookie', authcookie);

  if (!authcookie) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  try {
    const decoded = jwt.verify(authcookie, process.env.JWT_SECRET as string);

    const { id } = decoded as CustomPayload;

    db.query(`SELECT * from users WHERE id=${id}`, (err, result: IUser) => {
      if (result.length === 0) {
        return next(
          new AppError('The user belonging to this token does not exist.', 401)
        );
      }

      const { id, name, email } = result[0];

      (req as CustomRequestWithUser).user = { id, name, email };

      return next();
    });
  } catch (err) {
    return next(new AppError('JWT expired', 401));
  }
};
