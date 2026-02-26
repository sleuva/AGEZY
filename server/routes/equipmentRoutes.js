const express = require('express');
const router = express.Router();
const { getEquipment, addEquipment } = require('../controllers/equipmentController');

router.get('/', getEquipment);
router.post('/', addEquipment);

module.exports = router;
