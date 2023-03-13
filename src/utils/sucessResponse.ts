import { Response } from 'express';

interface Success {
  res: Response;
  statusCode: number;
  data: any;
}

const successResponse = ({ res, statusCode, data }: Success) => {
  return res.status(statusCode).json({
    success: true,
    data,
  });
};

export default successResponse;
