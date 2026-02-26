const mongoose = require('mongoose');

const LabourSchema = new mongoose.Schema({
    name: {
        type: String, // Individual Name or Group Leader Name
        required: true,
    },
    type: {
        type: String, // 'Individual', 'Group'
        required: true,
    },
    groupSize: {
        type: Number,
        default: 1, // 1 for Individual, >1 for Group
    },
    skills: {
        type: [String], // e.g., 'Harvesting', 'Sowing', 'Pesticide Spraying'
        required: true,
    },
    location: {
        type: String, // Current Location
        required: true,
    },
    availableFrom: {
        type: Date,
        default: Date.now,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Available', 'Booked'],
        default: 'Available',
    },
    wagePerDay: {
        type: Number, // Indicative wage
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Labour', LabourSchema);
