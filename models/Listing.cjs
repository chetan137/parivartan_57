const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
    category: { type: String, required: true }, // Example: "farmer", "potter", "painter"
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
    farmer: {
        materialName: { type: String },
        photos: { type: [String] },
        description: { type: String },
        rate: { type: Number },
        review: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
        quantity: { type: Number }
    },
    painter: {
        pictures: { type: [String] },
        rate: { type: Number },
        review: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
    },
    // Other categories follow the same pattern...
    totalSold: { type: Number, default: 0 } // Tracks total quantity sold
});
const Listing = mongoose.model('Listing', ListingSchema);
module.exports = {Listing};
