const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  try {
    const { name, shortDescription, longDescription, features, images } = req.body;

    const product = new Product({
      name,
      shortDescription,
      longDescription,
      features,
      images,
    });

    const savedProduct = await product.save();
    res.status(201).json({ message: 'Product created', product: savedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
};
