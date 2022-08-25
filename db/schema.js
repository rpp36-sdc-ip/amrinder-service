const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/SDC');

let productsSchema = new mongoose.Schema({
  _id: {type: Number, unique: true},
  name: String,
  slogan: String,
  description: String,
  category: String,
  price: Number
});

let relatedProductsSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
  products: []
});

let featuresSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
  feature: String,
  value: String,
});

let productStylesSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
  style_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Styles' }
});

let stylesSchema = new mongoose.Schema({
  _id: {type: Number, unique: true},
  name: String,
  original_price: Number,
  sale_price: Number,
  default: Boolean,
  photo_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Photos' },
  sku_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Skus' }
});

let photosSchema = new mongoose.Schema({
  _id: Number,
  thumbnail_url: String,
  url: String
});

let skusSchema = new mongoose.Schema({
  _id: Number,
  quantity: Number,
  size: String
});

const products = mongoose.model('Products', productsSchema);
const features = mongoose.model('Features', featuresSchema);
const styles = mongoose.model('Styles', stylesSchema);
const photos = mongoose.model('Photos', photosSchema);
const skus = mongoose.model('Skus', skusSchema);