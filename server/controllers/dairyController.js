const DairyProduct = require('../models/DairyProduct');

// @desc    Get all dairy products
// @route   GET /api/dairy
exports.getDairyProducts = async (req, res) => {
    try {
        const products = await DairyProduct.find();
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Add new dairy product
// @route   POST /api/dairy
exports.addDairyProduct = async (req, res) => {
    const { name, farmerName, location, price, unit, description, imageUrl } = req.body;

    try {
        const newProduct = new DairyProduct({
            name,
            farmerName,
            location,
            price,
            unit,
            description,
            imageUrl
        });

        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
