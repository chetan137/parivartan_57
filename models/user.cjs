// const mongoose = require('mongoose');

// // Seller Schema
// const SellerSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     mobileNo: { type: String, required: true },
//     state: { type: String, required: true },
//     city: { type: String, required: true },
//     pincode: { type: String, required: true },
//     password: { type: String, required: true },
//     categories: { type: [String], required: true } // Example: ["farmer", "potter", "painter"]
// });

// // Buyer Schema
// const BuyerSchema = new mongoose.Schema({
//     email: { type: String, required: true, unique: true },
//     googleAuthId: { type: String, required: true, unique: true }
// });

// // Review Schema
// const ReviewSchema = new mongoose.Schema({
//     buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Buyer', required: true },
//     rating: { type: Number, required: true },
//     comment: { type: String }
// });

// // Listing Schema
// const ListingSchema = new mongoose.Schema({
//     category: { type: String, required: true }, // Example: "farmer", "potter", "painter"
//     farmer: {
//         materialName: { type: String },
//         photos: { type: [String] }, // Array of image URLs
//         description: { type: String },
//         rate: { type: Number },
//         review: [ReviewSchema],
//         quantity: { type: Number }
//     },
//     bookSeller: {
//         rate: { type: Number },
//         review: [ReviewSchema]
//     },
//     painter: {
//         pictures: { type: [String] }, // Array of image URLs
//         rate: { type: Number },
//         review: [ReviewSchema]
//     },
//     potter: {
//         pictures: { type: [String] }, // Array of image URLs
//         rate: { type: Number }
//     },
//     sewer: {
//         pictures: { type: [String] }, // Array of image URLs
//         rate: { type: Number }
//     }
// });

// // Models
// const Seller = mongoose.model('Seller', SellerSchema);
// const Buyer = mongoose.model('Buyer', BuyerSchema);
// const Listing = mongoose.model('Listing', ListingSchema);

// module.exports = { Seller, Buyer, Listing };
