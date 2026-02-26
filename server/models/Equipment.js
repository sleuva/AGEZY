const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String, // e.g., 'Tractor', 'Harvester', 'Sprayer'
        required: true,
    },
    ownerName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    pricePerHour: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String, // URL to image (simulated or uploaded)
    },
    available: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Equipment', EquipmentSchema);
