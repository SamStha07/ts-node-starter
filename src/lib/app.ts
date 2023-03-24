import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import xss from 'xss-clean';
import fileUpload from 'express-fileupload';
import HttpStatusCodes from '@utils/httpStatusCode';
import AppError from '@utils/appError';
import { CustomError } from '@type/customError';
import userRouter from '@routes/user.route';
import projectRouter from '@routes/project.route';
import globalErrorHandler from '@controller/error.controller';
import technologyRouter from '@routes/technology.route';

const app = express();

dotenv.config();

app.use(cors());

app.use(cookieParser());

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 2024 * 1024 },
  })
);

// Set security HTTP headers
app.use(helmet());

// middleware betn req and res
// Development loading
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/uploads', express.static('uploads'));

// to make Node app more secure
// limits the request made while requesting data in same API
const limiter = rateLimit({
  max: 100, // 100 requests from same IP varies upon different projects
  // in (headers) we can see the rate-limit and rate limit remaining
  windowMs: 60 * 60 * 1000, // in 1hr in ms
  message: 'Too many requests from this IP, please try again in an hour',
});

// only limits for api requests only
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanization against XSS
app.use(xss());

// Prevent parameter pollution
// while quering or filtering as /api/tours/?sort=duration&sort=price will show the filtered data
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// Serving static files
// app.use(express.static(`${__dirname}/public`));

// routes handlers - for homepage
app.get('/', (_: Request, res: Response) => {
  res.status(200).json({
    message: 'Hello from Server',
    app: 'Portfolio',
  });
});

// routes
app.use('/api/user', userRouter);
app.use('/api/projects', projectRouter);
app.use('/api/technology', technologyRouter);

// middleware for unknown route to show error for all HTTPHeaders
// Global error handling Middleware
app.all('*', (req: Request, _: Response, next: NextFunction) => {
  return next(
    new AppError(
      `Can't find ${req.originalUrl} on this server!`,
      HttpStatusCodes.NOT_FOUND
    )
  );
});

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  // inorder to show the errors in json format we have to set header as below
  res.setHeader('Content-Type', 'application/json');
  globalErrorHandler(err, req, res, next);
});

export default app;
