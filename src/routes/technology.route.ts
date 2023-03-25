import { Router } from 'express';
import {
  createTechnology,
  getAllTechnology,
} from '@controller/technology.controller';
import { validateTechnologyCreate } from '@middleware/technologyValidate';

const technologyRouter = Router();

technologyRouter
  .route('/create')
  .post(validateTechnologyCreate, createTechnology);
technologyRouter.route('/').get(getAllTechnology);

export default technologyRouter;
