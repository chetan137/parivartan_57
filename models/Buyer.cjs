const mongoose = require('mongoose');
const BuyerSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    googleAuthId: { type: String, required: true, unique: true },
    purchasedListings: [{
        listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' },
        quantity: { type: Number },
        purchaseDate: { type: Date, default: Date.now }
    }]
});
const Buyer = mongoose.model('Buyer', BuyerSchema);
module.exports = {Buyer};
