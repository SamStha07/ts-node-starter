import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  loginUser,
} from '@controller/user.controller';
import { validateUserCreate } from '@middleware/uservalidator';
import { checkToken } from '@middleware/checkToken';

const userRouter = Router();

userRouter.route('/register').post(validateUserCreate, createUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/all').get(checkToken, getAllUsers);

export default userRouter;
