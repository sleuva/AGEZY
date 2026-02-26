const mongoose = require('mongoose');

const DairyProductSchema = new mongoose.Schema({
    name: {
        type: String, // e.g., 'Fresh Cow Milk', 'Buffalo Ghee', 'Paneer'
        required: true,
    },
    farmerName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    unit: {
        type: String, // e.g., 'Litre', 'Kg'
        required: true,
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String,
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

module.exports = mongoose.model('DairyProduct', DairyProductSchema);
