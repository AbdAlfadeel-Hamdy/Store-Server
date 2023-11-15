import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import Product from '../models/Product.js';

export const getAllProducts: Handler = async (req, res, next) => {
  const products = await Product.find();
  res.status(StatusCodes.OK).json({ products });
};
