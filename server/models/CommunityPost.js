const mongoose = require('mongoose');

const CommunityPostSchema = new mongoose.Schema({
    author: {
        type: String, // Farmer Name
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Question', 'Success Story', 'Tip', 'General'],
        default: 'General'
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [{
        author: String,
        text: String,
        date: { type: Date, default: Date.now }
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('CommunityPost', CommunityPostSchema);
