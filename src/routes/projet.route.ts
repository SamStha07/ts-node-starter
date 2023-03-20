/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { Router } from 'express';
import {
  createProject,
  getCurrentUserPojectsList,
} from '@controller/project.controller';
import { checkToken } from '@middleware/checkToken';
import { validateProjectCreate } from '@middleware/projectValidator';

// type DestinationCallback = (error: Error | null, destination: string) => void;
// type FileNameCallback = (error: Error | null, filename: string) => void;

const projectRouter = Router();

// export const fileStorage = multer.diskStorage({
//   destination: (
//     _request: Request,
//     _file: Express.Multer.File,
//     callback: DestinationCallback
//   ): void => {
//     callback(null, 'uploads/');
//   },

//   filename: (
//     _req: Request,
//     file: Express.Multer.File,
//     callback: FileNameCallback
//   ): void => {
//     callback(null, `${Date.now()}_${file.originalname}`);
//   },
// });

// const fileFilter = (
//   _request: Request,
//   file: Express.Multer.File,
//   callback: FileFilterCallback
// ): void => {
//   if (
//     file.mimetype === 'image/png' ||
//     file.mimetype === 'image/jpg' ||
//     file.mimetype === 'image/jpeg'
//   ) {
//     callback(null, true);
//   } else {
//     callback(null, false);
//   }
// };

// const upload = multer({ storage: fileStorage, fileFilter });

projectRouter.route('/create').post(
  checkToken,
  validateProjectCreate,
  // upload.single('image_url'),
  createProject
);
projectRouter.route('/').get(checkToken, getCurrentUserPojectsList);

export default projectRouter;
