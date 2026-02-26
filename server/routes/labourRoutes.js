const express = require('express');
const router = express.Router();
const { getLabour, addLabour } = require('../controllers/labourController');

router.get('/', getLabour);
router.post('/', addLabour);

module.exports = router;
