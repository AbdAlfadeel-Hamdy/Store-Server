import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import AppError from '../utils/appError.js';

const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res
    .status(
      error instanceof AppError
        ? error.statusCode
        : StatusCodes.INTERNAL_SERVER_ERROR
    )
    .json({
      message:
        error instanceof AppError ? error.message : 'Something went wrong',
    });
};

export default errorHandler;
