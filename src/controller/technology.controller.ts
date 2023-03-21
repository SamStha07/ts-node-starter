/* eslint-disable camelcase */
import { NextFunction, Response, Request } from 'express';
import { UploadedFile } from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';
import db from '@lib/db';
import successResponse from '@utils/sucessResponse';

export const createTechnology = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  const image = req.files?.image_url as UploadedFile;

  await cloudinary.uploader
    .upload(image.tempFilePath, {
      folder: 'projects',
      resource_type: 'image',
    })
    .then(response => {
      const secureImagePath = response.secure_url;

      db.query(
        `INSERT INTO technologies(name, image_url) VALUES ('${name}', '${secureImagePath}');`,
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
    })
    .catch(err => next(err));
};
