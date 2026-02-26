const mongoose = require('mongoose');

const TechGuideSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String, // e.g., 'Modern Farming', 'Tools', 'Sustainable Practices'
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String, // Optional YouTube link
    },
    imageUrl: {
        type: String,
    },
    author: {
        type: String,
        default: 'AGEZY Team',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('TechGuide', TechGuideSchema);
