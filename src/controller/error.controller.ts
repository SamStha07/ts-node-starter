import { Response, Request, NextFunction } from 'express';
import { CustomError } from '@type/customError';

export const sendErrorDev = (err: CustomError, res: Response) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: CustomError, res: Response) => {
  // Operational error, trusted error: send message to client

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
    });
  }
  // Programming or other unknown error: don't leak error details to the client

  // 1) log error
  console.error('ERROR', err);

  // 2) Send generic message
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong',
  });
};

const globalErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }
  // Production part isnot running
  if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, res);
  }

  next(err);
};

export default globalErrorHandler;
