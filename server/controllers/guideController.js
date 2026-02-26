const TechGuide = require('../models/TechGuide');

// @desc    Get all tech guides
// @route   GET /api/guides
exports.getGuides = async (req, res) => {
    try {
        const guides = await TechGuide.find();
        res.json(guides);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Add new tech guide
// @route   POST /api/guides
exports.addGuide = async (req, res) => {
    const { title, category, content, videoUrl, imageUrl } = req.body;

    try {
        const newGuide = new TechGuide({
            title,
            category,
            content,
            videoUrl,
            imageUrl
        });

        const guide = await newGuide.save();
        res.json(guide);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
