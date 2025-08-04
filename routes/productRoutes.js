const express = require("express");
const router = express.Router();
const { createProduct, getProducts, getUploadUrl } = require("../controllers/productController");

router.post("/uploadProduct", createProduct);
router.get("/getProducts", getProducts);
router.get("/upload-url", getUploadUrl);

module.exports = router;
