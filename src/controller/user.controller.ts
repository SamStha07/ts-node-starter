/* eslint-disable consistent-return */
import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import db from '@lib/db';
import AppError from '@utils/appError';
import successResponse from '@utils/sucessResponse';
import { IUser, User } from '@type/user.types';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  db.query(
    `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(email)});`,
    (err, result: IUser) => {
      if (err) {
        return next(err);
      }

      if (result.length) {
        return next(new AppError('Email is already in use!', 409));
      }

      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return next(err);
        }
        db.query(
          `INSERT INTO users (name, email, password) VALUES ('${name}', ${db.escape(
            email
          )}, ${db.escape(hash)})`,
          err => {
            if (err) {
              return next(err);
            }
            return successResponse({
              res,
              statusCode: 201,
              msg: 'User has been registered successfully!',
            });
          }
        );
      });
    }
  );
};

export const loginUser = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  db.query(
    `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(email)});`,
    (err, result: IUser) => {
      if (err) {
        return next(err);
      }

      if (!result.length) {
        return next(new AppError('Email or password is incorrect', 401));
      }

      bcrypt.compare(password, result[0].password, (err, success) => {
        if (err) {
          return next(err);
        }
        if (!success) {
          return next(new AppError('Email or password is incorrect', 401));
        }

        if (success) {
          const token = jwt.sign(
            {
              id: result[0].id,
            },
            process.env.JWT_SECRET as string,
            {
              expiresIn: process.env.JWT_EXPIRES_IN,
            }
          );

          res.cookie('authCookie', token, {
            maxAge: 1000 * 60 * 60 * 24, // 1hr=36,00,000, 24hr=1hr*24
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
          });

          return successResponse({
            res,
            statusCode: 200,
            msg: 'User logged in successfully!',
          });
        }
      });
    }
  );
};

export const getAllUsers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  db.query(`SELECT * FROM users;`, async (err, result: IUser) => {
    if (err) {
      return next(err);
    }

    if (!result.length) {
      return next(new AppError('Email or password is incorrect', 401));
    }

    const arr: User[] = [];
    await result.map((res: User) =>
      arr.push({
        id: res.id,
        name: res.name,
        email: res.email,
        created_at: res.created_at,
      })
    );

    return successResponse({ res, data: arr, statusCode: 200 });
  });
};
