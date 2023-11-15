import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import Product from '../models/Product.js';
import { createAppError } from '../utils/appError.js';

const filterObj = (obj: { [key: string]: any }, props: string[]) => {
  const filteredObj: { [key: string]: any } = {};
  for (let prop of props) {
    if (obj[prop]) filteredObj[prop] = obj[prop];
  }
  return filteredObj;
};

export const getAllProducts: Handler = async (req, res) => {
  const queryObject = filterObj(req.query, [
    'name',
    'company',
    'featured',
    'rating',
    'price',
  ]);

  // if (queryObject.name) queryObject.name = new RegExp(queryObject.name as string, 'i');
  if (queryObject.name)
    queryObject.name = { $regex: queryObject.name, $options: 'i' };
  // Sorting
  const { sort } = req.query;
  const sortString = (sort as string)?.split(',').join(' ');
  // Selecting Fields
  const fields = (req.query.fields as string)?.split(',');
  // Pagination
  const page = +(req.query.page || 1);
  const limit = +(req.query.limit || 10);
  const skip = (page - 1) * limit;
  // Numeric Filters
  const { numericFilters } = req.query;
  if (numericFilters) {
    const operatorMap: { [key: string]: string } = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regExp = /\b(>|>=|=|<|<=)\b/g;
    const options = ['price', 'rating'];
    const filters = (numericFilters as string)?.replace(
      regExp,
      (match) => `-${operatorMap[match]}-`
    );
    filters.split(',').forEach((filter) => {
      const [field, operator, value] = filter.split('-');
      if (options.includes(field)) queryObject[field] = { [operator]: +value };
    });
  }
  // Building the Query
  // const products = await Product.find(queryObject)
  //   .sort(sortString)
  //   .select(fields)
  //   .skip(skip)
  //   .limit(limit);
  const resultQuery = Product.find(queryObject);
  resultQuery.sort(sortString || '-createdAt');
  if (fields) resultQuery.select(fields);
  resultQuery.skip(skip).limit(limit);
  const products = await resultQuery;

  if (!products.length)
    createAppError('No products were found!', StatusCodes.NOT_FOUND);

  res.status(StatusCodes.OK).json({ results: products.length, products });
};
