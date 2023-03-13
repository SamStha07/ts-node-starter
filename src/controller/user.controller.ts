import { Request, Response } from 'express';
import successResponse from '@utils/sucessResponse';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: 'admin' | 'customer' | 'vendor';
// }

// const signToken = id => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
// };

export const createUser = (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  console.log('register', { name, email, password });

  return successResponse({
    res,
    statusCode: 200,
    data: [],
  });
};
