const mongoose = require('mongoose');
const SellerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobileNo: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    password: { type: String, required: true },
    categories: { type: [String], required: true }, // Example: ["farmer", "potter", "painter"]
    totalSales: { type: Number, default: 0 }, // Total sales by the seller
    earnings: { type: Number, default: 0 }, // Total earnings
    bankDetails: {
        accountHolderName: { type: String },
        accountNumber: { type: String },
        ifscCode: { type: String }
    }
});
const Seller = mongoose.model('Seller', SellerSchema);
module.exports = { Seller};
