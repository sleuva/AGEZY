const Scheme = require('../models/Scheme');

// @desc    Get all schemes
// @route   GET /api/schemes
exports.getSchemes = async (req, res) => {
    try {
        const schemes = await Scheme.find().sort({ deadline: 1 }); // Sort by nearest deadline
        res.json(schemes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Add new scheme
// @route   POST /api/schemes
exports.addScheme = async (req, res) => {
    const { title, description, eligibility, benefits, deadline, applicationLink, category } = req.body;

    try {
        const newScheme = new Scheme({
            title,
            description,
            eligibility,
            benefits,
            deadline,
            applicationLink,
            category
        });

        const scheme = await newScheme.save();
        res.json(scheme);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
