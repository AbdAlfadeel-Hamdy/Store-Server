import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import products from './products.json' assert { type: 'json' };
// Access .env file
dotenv.config();

try {
  await mongoose.connect(process.env.MONGO_URI!);
  console.log('Connected to the database successfully...');
  await Product.deleteMany();
  await Product.create(products);
  console.log('Populated the database successfully...');
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
