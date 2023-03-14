import { Response } from 'express';

interface Success {
  res: Response;
  statusCode: number;
  data?: any;
  msg?: string;
}

const successResponse = ({ res, statusCode, data, msg }: Success) => {
  return res.status(statusCode).json({
    success: true,
    data,
    message: msg,
  });
};

export default successResponse;
