/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import { v2 as cloudinary } from 'cloudinary';
import { NextFunction, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import db from '@lib/db';
import { IProjectWithDatapacket } from '@type/project.types';
import { CustomRequestWithUser } from '@type/user.types';
import AppError from '@utils/appError';
import successResponse from '@utils/sucessResponse';

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req as CustomRequestWithUser;
  const { name, description } = req.body;

  const image = req.files?.image_url as UploadedFile;

  if (!user) {
    return next(new AppError('user not found', 404));
  }

  db.query(
    `INSERT INTO projects(name, description, user_id) VALUES ('${name}', '${description}', ${user.id});`,
    (err, result) => {
      if (err) {
        return next(err);
      }

      if (result) {
        db.query(
          'SELECT * FROM projects WHERE name = ?',
          [name],
          async (err, results: IProjectWithDatapacket[]) => {
            if (err) {
              return next(err);
            }
            const { id } = results[0];

            await cloudinary.uploader
              .upload(image.tempFilePath, {
                folder: 'projects',
                resource_type: 'image',
              })
              .then(response => {
                const secureImagePath = response.secure_url;

                db.query(
                  `INSERT INTO photos(project_id, image_url) VALUES (${id}, '${secureImagePath}')`,
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
              })
              .catch(err => next(err));
          }
        );
      }
    }
  );
};

export const getCurrentUserPojectsList = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req as CustomRequestWithUser;

  db.query(
    `SELECT projects.id, projects.name, projects.description, photos.image_url, projects.user_id, projects.created_at FROM projects JOIN photos GROUP BY projects.id HAVING user_id = ?`,
    [user.id],
    (err, results: IProjectWithDatapacket[]) => {
      if (err) {
        return next(err);
      }

      const { id, name, description, image_url, created_at } = results[0];

      return successResponse({
        res,
        statusCode: 200,
        data: { id, name, description, image_url, created_at },
      });
    }
  );
};
