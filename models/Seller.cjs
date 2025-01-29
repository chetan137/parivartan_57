const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const SellerSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Removed unique: true from name
    mobileNo: { type: String, required: true, unique: true }, // Ensure mobileNo is unique
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
    email: { type: String, sparse: true }, // Email is optional, prevents duplicate key errors
}, { timestamps: true });

// Hash password before saving
SellerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare Password
SellerSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Seller = mongoose.model("Seller", SellerSchema);
module.exports = Seller;
