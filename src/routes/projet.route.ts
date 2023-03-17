import { Router } from 'express';
import { checkToken } from '@middleware/checkToken';
import {
  createProject,
  getCurrentUserPojectsList,
} from '@controller/project.controller';

const projectRouter = Router();

projectRouter.route('/create').post(checkToken, createProject);
projectRouter.route('/').get(checkToken, getCurrentUserPojectsList);

export default projectRouter;
