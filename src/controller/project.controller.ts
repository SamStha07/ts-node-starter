/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import { v2 as cloudinary } from 'cloudinary';
import { NextFunction, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import db from '@lib/db';
import {
  IProject,
  IProjectWithDatapacket,
  ITechnologyWithDatapacket,
} from '@type/project.types';
import { CustomRequestWithUser } from '@type/user.types';
import AppError from '@utils/appError';
import successResponse from '@utils/sucessResponse';

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req as CustomRequestWithUser;
  const { name, description, technology_ids } = req.body;

  const technologyIds = JSON.parse(technology_ids);

  const images = req.files?.image_url as UploadedFile[];

  if (!user) {
    return next(new AppError('user not found', 404));
  }

  db.query(
    `INSERT INTO projects(name, description, user_id) VALUES ('${name}', '${description}', ${user.id});`,
    err => {
      if (err) {
        return next(err);
      }

      db.query(
        'SELECT * FROM projects WHERE name = ?',
        [name],
        async (err, results: IProjectWithDatapacket[]) => {
          if (err) {
            return next(err);
          }
          const { id: project_id } = results[0];

          technologyIds.forEach(({ id }: { id: number }) =>
            db.query(
              `INSERT INTO project_tech(project_id, technology_id) VALUES (${project_id}, ${id})`,
              err => {
                if (err) {
                  return next(err);
                }
              }
            )
          );

          images.forEach(async (image, idx) => {
            try {
              const cloudinaryResponse = await cloudinary.uploader.upload(
                image.tempFilePath,
                {
                  folder: 'projects',
                  resource_type: 'image',
                }
              );
              const secureImagePath = cloudinaryResponse.secure_url;

              db.query(
                `INSERT INTO photos(project_id, image_url) VALUES (${project_id}, '${secureImagePath}')`,
                err => {
                  if (err) {
                    return next(err);
                  }

                  /**
                   * will the index of forEach and images length
                   * if idx and images length matches then only send the response otherwise error will thrown as
                   * ERROR: Cannot set headers after they are sent to client
                   * above error occurs because we are sending multiple responses from same controller
                   */
                  if (idx === images.length - 1) {
                    return successResponse({
                      res,
                      statusCode: 201,
                      msg: 'project created successfully',
                    });
                  }
                }
              );
            } catch (err) {
              return next(err);
            }
          });
        }
      );
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
    `SELECT * FROM projects WHERE user_id = ?`,
    [user.id],
    (err, results: IProjectWithDatapacket[]) => {
      if (err) {
        return next(err);
      }

      const dataArray: IProject[] = [];

      if (results.length === 0) {
        return successResponse({
          res,
          statusCode: 200,
          data: [],
        });
      }

      results.forEach(data => {
        db.query(
          `SELECT id, image_url FROM photos WHERE project_id = ?`,
          [data.id],
          (err, photoResults) => {
            if (err) {
              return next(err);
            }

            db.query(
              `SELECT projects.id, technologies.id, technologies.name FROM projects JOIN project_tech ON projects.id = project_tech.project_id JOIN technologies ON technologies.id = project_tech.technology_id HAVING projects.id = ?`,
              [data.id],
              (err, result: ITechnologyWithDatapacket[]) => {
                if (err) {
                  return next(err);
                }

                dataArray.push({
                  ...data,
                  photos: photoResults,
                  technologies: result,
                });

                if (dataArray.length === results.length) {
                  return successResponse({
                    res,
                    statusCode: 200,
                    data: dataArray,
                  });
                }
              }
            );
          }
        );
      });
    }
  );
};
