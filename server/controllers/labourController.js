const Labour = require('../models/Labour');

// @desc    Get all labour profiles
// @route   GET /api/labour
exports.getLabour = async (req, res) => {
    try {
        const labour = await Labour.find();
        res.json(labour);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Register new labour (Individual or Group)
// @route   POST /api/labour
exports.addLabour = async (req, res) => {
    const { name, type, groupSize, skills, location, contactNumber, wagePerDay } = req.body;

    try {
        const newLabour = new Labour({
            name,
            type,
            groupSize: type === 'Group' ? groupSize : 1,
            skills,
            location,
            contactNumber,
            wagePerDay
        });

        const labour = await newLabour.save();
        res.json(labour);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
