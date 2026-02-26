const express = require('express');
const router = express.Router();
const { getDairyProducts, addDairyProduct } = require('../controllers/dairyController');

router.get('/', getDairyProducts);
router.post('/', addDairyProduct);

module.exports = router;
