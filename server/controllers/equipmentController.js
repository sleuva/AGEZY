const Equipment = require('../models/Equipment');

// @desc    Get all equipment
// @route   GET /api/equipment
exports.getEquipment = async (req, res) => {
    try {
        const equipment = await Equipment.find();
        res.json(equipment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Add new equipment
// @route   POST /api/equipment
exports.addEquipment = async (req, res) => {
    const { name, type, ownerName, location, pricePerHour, description, imageUrl } = req.body;

    try {
        const newEquipment = new Equipment({
            name,
            type,
            ownerName,
            location,
            pricePerHour,
            description,
            imageUrl
        });

        const equipment = await newEquipment.save();
        res.json(equipment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
