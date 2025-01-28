const mongoose = require('mongoose');
const ReviewSchema = new mongoose.Schema({
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer', required: true },
    rating: { type: Number, required: true },
    comment: { type: String }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports =  { Review };
