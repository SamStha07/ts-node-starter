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
  const { name, description, technology_ids } = req.body;

  const technologyIds = JSON.parse(technology_ids);

  // technologyIds.forEach((id: number) => console.log('id', id.id));

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

            cloudinary.uploader
              .upload(image.tempFilePath, {
                folder: 'projects',
                resource_type: 'image',
              })
              .then(response => {
                const secureImagePath = response.secure_url;

                db.query(
                  `INSERT INTO photos(project_id, image_url) VALUES (${project_id}, '${secureImagePath}')`,
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
    // `SELECT projects.id, projects.name, projects.description, photos.image_url, projects.user_id, projects.created_at FROM projects JOIN photos GROUP BY projects.id HAVING user_id = ?`,
    `SELECT projects.id, projects.name, projects.description, photos.image_url, projects.user_id, projects.created_at FROM projects JOIN photos GROUP BY projects.id HAVING user_id = ?`,
    [user.id],
    (err, results: IProjectWithDatapacket[]) => {
      if (err) {
        return next(err);
      }
      // results = will give given user all projects

      // console.log('results', results);

      results.forEach(data =>
        db.query(
          `SELECT * FROM technologies INNER JOIN project_tech ON project_id = ? GROUP BY technologies.id`,
          [data.id],
          (err, result) => {
            if (err) {
              return next(err);
            }

            console.log('returned result', data?.id, result);
          }
        )
      );

      // eslint-disable-next-line prefer-const
      // let mergeResult: any = [];

      // results.forEach(data =>
      //   db.query(
      //     `SELECT * FROM project_tech JOIN technologies WHERE project_id = ? GROUP BY technologies.id`,
      //     [data.id],
      //     (err, result) => {
      //       if (err) {
      //         return next(err);
      //       }
      //       // console.log('nestedt result', result, data);
      //       const mergeResult = { technologies: result, projects: data };
      //       // console.log('mergeResult', mergeResult);

      //       // mergeResult.push(mergeResult);
      //     }
      //   )
      // );

      // console.log('mergeResult', mergeResult);

      // const { id, name, description, image_url, created_at } = results;

      // return successResponse({
      //   res,
      //   statusCode: 200,
      //   data: results,
      // });

      // db.query(
      //   `SELECT technologies.id, technologies.name FROM project_tech JOIN technologies WHERE project_id = ? GROUP BY technologies.id`,
      //   [id],
      //   (err, result) => {
      //     if (err) {
      //       return next(err);
      //     }

      //     return successResponse({
      //       res,
      //       statusCode: 200,
      //       data: {
      //         id,
      //         name,
      //         description,
      //         image_url,
      //         technology: result,
      //         created_at,
      //       },
      //     });
      //   }
      // );
    }
  );
};
