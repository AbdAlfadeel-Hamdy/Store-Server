import { Schema, model } from 'mongoose';

const schema = new Schema({
  price: Number,
});

export default model('Product', schema);
