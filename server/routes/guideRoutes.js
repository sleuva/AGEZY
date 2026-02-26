const express = require('express');
const router = express.Router();
const { getGuides, addGuide } = require('../controllers/guideController');

router.get('/', getGuides);
router.post('/', addGuide);

module.exports = router;
