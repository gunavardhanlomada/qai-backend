const express = require('express');
const router = express.Router();
const {createPublication, getAllPublications, editPublication, deletePublication} = require('../controllers/publicationController');
const { protect } = require('../middleware/authMiddleware');

router.post('/add-publication', createPublication);
router.get('/get-publications', protect,getAllPublications);
router.put('/edit-publication/:id', protect,editPublication);
router.delete('/delete-publication/:id', protect,deletePublication);

module.exports = router;
