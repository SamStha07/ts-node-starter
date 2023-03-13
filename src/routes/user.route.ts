import { Router } from 'express';
import { createUser } from '@controller/user.controller';
import { validateUserCreate } from '@middleware/uservalidator';

const userRouter = Router();

userRouter.route('/register').post(validateUserCreate, createUser);

export default userRouter;
