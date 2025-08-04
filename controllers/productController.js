const Product = require("../models/Product");
// const s3 = require("../utils/s3");
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');


exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json({ message: "Product created", product: saved });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUploadUrl = async (req, res) => {
  const { filename } = req.query;
  
    try {
  
      const s3 = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
      });
  
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: filename,
        ContentType: 'image/jpeg'
      });
  
      const signedUrl = await getSignedUrl(s3, command, { expiresIn: 300  });
  
      res.json({ url: signedUrl });
    } catch (err) {
      console.error("S3 error:", err);
      res.status(500).json({ error: "Failed to generate upload URL" });
    }
};


exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};
