const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { getUploadUrl } = require('../utils/s3');
const { protect } = require('../middleware/authMiddleware');

router.post('/add-products', protect,productController.createProduct);
router.get('/get-products', productController.createProduct);
router.get('/get-product/:id', productController.createProduct);



router.get('/s3-upload-url/:type', async (req, res) => {
  try {
    const fileType = req.params.type;
    console.log(`Generating S3 upload URL for file type: ${fileType}`);
    const { url, key } = await getUploadUrl(fileType);
    const s3Url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    res.json({ uploadUrl: url, fileUrl: s3Url });
  } catch (err) {
    res.status(500).json({ error: 'Could not generate upload URL' });
  }
});


module.exports = router;
