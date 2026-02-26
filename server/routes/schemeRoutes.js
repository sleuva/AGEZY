const express = require('express');
const router = express.Router();
const { getSchemes, addScheme } = require('../controllers/schemeController');

router.get('/', getSchemes);
router.post('/', addScheme);

module.exports = router;
