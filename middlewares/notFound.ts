import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

const notFound: Handler = (req, res) =>
  res.status(StatusCodes.NOT_FOUND).json({ message: 'Route does not exist!' });

export default notFound;
