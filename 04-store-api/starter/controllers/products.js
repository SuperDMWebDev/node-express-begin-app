const Product = require('../models/product');
const getAllProductsStatic = async (req, res, next) => {
  const search = 'a';
  const products = await Product.find({
    price: { $gt: 30 },
  })
    .sort('price')
    .select('name price');
  res.status(200).json({ item: products, nbHits: products.length });
};
const getAllProducts = async (req, res, next) => {
  const { featured, company, name } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $option: 'i' };
  }
  console.log(queryObject);
  const products = await Product.find(queryObject);

  res.status(201).json({ item: products, nbHits: products.length });
};

module.exports = { getAllProductsStatic, getAllProducts };
