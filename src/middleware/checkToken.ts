/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AppError from '@utils/appError';

export const checkToken = (req: Request, _: Response, next: NextFunction) => {
  const authcookie = req.cookies.authCookie;

  if (!authcookie) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  try {
    jwt.verify(authcookie, process.env.JWT_SECRET as string);
    next();
  } catch (err) {
    return next(new AppError('JWT expired', 401));
  }
};
