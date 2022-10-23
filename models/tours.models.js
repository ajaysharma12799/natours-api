const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    priceDiscount: {
        type: Number,
    },
    ratingsAverage: {
        type: Number,
        required: true,
        default: 4.5,
    },
    ratingsQuantity: {
        type: Number,
        default: 0,
    },
    duration: {
        type: Number,
        required: true
    },
    maxGroupSize: {
        type: Number,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    imageCover: {
        type: String,
        required: true,
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    startDates: [Date]
});

module.exports = mongoose.model('Tour', TourSchema);
