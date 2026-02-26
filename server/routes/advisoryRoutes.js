const express = require('express');
const router = express.Router();
const { getCropRecommendation } = require('../controllers/advisoryController');

router.post('/crop-recommendation', getCropRecommendation);

module.exports = router;
