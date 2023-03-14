import { Response, Request } from 'express';
import { CustomError } from '@type/customError';

export const sendErrorDev = (err: CustomError, res: Response) =>
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });

const sendErrorProd = (err: CustomError, res: Response) => {
  // Operational error, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
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

// const handleCastErrorDB = (error: CustomError) => {
//   const message = `Invalid ${error.path}: ${error.value}.`;
//   return new AppError(message, 400);
// };

// const handleDuplicateFieldDB = (error) => {
//   const message = `Duplicate field value ${error.keyValue.name}: Please use another key value`;
//   return new AppError(message, 400);
// };

// const handleValidationErrorDB = () => {
//   const message = 'Invalid input data';
//   return new AppError(message, 400);
// };

const globalErrorHandler = (err: CustomError, req: Request, res: Response) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }
  // Production part isnot running
  if (process.env.NODE_ENV === 'production') {
    // error showing to the client using mongoose DB error
    // let error = {
    //   ...err,
    // };
    // if (error.name === 'CastError') error = handleCastErrorDB(error); // this line willnot run because there isnot error.name in the error

    // Duplicate database fields
    // if (error.code === 11000) error = handleDuplicateFieldDB(error);

    // if (error.name === 'ValidationError')
    //   error = handleValidationErrorDB(error);

    sendErrorProd(err, res);
  }
};

export default globalErrorHandler;
