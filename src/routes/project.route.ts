import { Router } from 'express';
import { checkToken } from '@middleware/checkToken';
import { validateProjectCreate } from '@middleware/projectValidator';
import {
  createProject,
  getCurrentUserPojectsList,
} from '@controller/project.controller';

const projectRouter = Router();

projectRouter
  .route('/create')
  .post(checkToken, validateProjectCreate, createProject);
projectRouter.route('/').get(checkToken, getCurrentUserPojectsList);

export default projectRouter;
