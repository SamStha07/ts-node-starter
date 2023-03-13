/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import mysql from 'mysql2';
import { NextFunction, Request, Response } from 'express';
import AppError from '@utils/appError';
import successResponse from '@utils/sucessResponse';
import db from '../lib/db';

export const getAllComments = (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  db.query('SELECT * FROM comments', (err, results) => {
    if (err) {
      return next(err);
    }
    return successResponse({
      res,
      statusCode: 200,
      data: results,
    });
  });
};

export const updateCommentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { comment } = req.body;

  if (!comment) {
    return next(new AppError('Comment must be included in body', 400));
  }

  const findCommentById = 'SELECT * FROM comments WHERE id = ?';

  db.execute(findCommentById, [id], (err: mysql.QueryError, results) => {
    if (err) return next(err);
    if (results.length === 0) {
      return next(new AppError('ID not found', 404));
    }
    db.query(
      `Update comments SET comment_text = "${comment}" where id = "${id}"`,
      err => {
        if (err) return next(err);

        db.query(findCommentById, [req.params.id], (err, results) => {
          if (err) return next(err);

          console.log('results', results);

          return successResponse({
            res,
            statusCode: 200,
            data: results,
          });
        });
      }
    );
  });
};
