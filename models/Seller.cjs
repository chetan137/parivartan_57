const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const SellerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobileNo: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    password: { type: String, required: true },
    categories: { type: [String], required: true },
    totalSales: { type: Number, default: 0 },
    earnings: { type: Number, default: 0 },
    bankDetails: {
        accountHolderName: { type: String },
        accountNumber: { type: String },
        ifscCode: { type: String },
    },
});

// Hash password before saving
SellerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const Seller = mongoose.model("Seller", SellerSchema);
module.exports = Seller;
