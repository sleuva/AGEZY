const mongoose = require('mongoose');

const SchemeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    eligibility: {
        type: String,
        required: true,
    },
    benefits: {
        type: String,
    },
    deadline: {
        type: Date,
    },
    applicationLink: {
        type: String, // URL to govt portal
    },
    category: {
        type: String, // e.g., 'Subsidy', 'Loan', 'Insurance'
        default: 'General'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Scheme', SchemeSchema);
