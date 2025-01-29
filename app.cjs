const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
require("dotenv").config();
require("./config/passport.cjs"); // Local strategy for seller
require("./config/googleAuth.cjs"); // Google OAuth strategy for buyer

// Route Imports
const sellerAuthRoutes = require("./routes/authSeller.cjs");
const buyerAuthRoutes = require("./routes/authBuyer.cjs");
const sellerRoutes = require("./routes/seller.cjs");
const buyerRoutes = require("./routes/buyer.cjs");
const paymentRoutes = require("./routes/payment.cjs");

// Create Express App
const app = express();

// Database Connection
const mongoURI = process.env.MONGO_URI || process.env.MONGO2;
mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow cookies and credentials
}));
app.use(express.json());
app.use(bodyParser.json());

// Session Middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET || "mycodesecret",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: mongoURI }), // Store sessions in MongoDB
        cookie: {
            secure: false, // Set to true in production (HTTPS)
            httpOnly: true, // Prevent client-side JavaScript access to cookies
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
    })
);

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

// Passport Serialization/Deserialization
passport.serializeUser((user, done) => {
    done(null, user._id); // Use MongoDB `_id` as the unique identifier
});

passport.deserializeUser(async (id, done) => {
    try {
        const User = mongoose.model("User"); // Dynamically fetch either Seller or Buyer
        const user = await User.findById(id);
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (error) {
        console.error("Error during deserialization:", error);
        done(error, null);
    }
});

// API Routes
app.use("/api/auth/seller", sellerAuthRoutes); // Seller Auth (Local)
app.use("/api/auth/buyer", buyerAuthRoutes); // Buyer Auth (Google OAuth)
app.use("/api/sellers", sellerRoutes); // Seller routes
app.use("/api/buyers", buyerRoutes); // Buyer routes
app.use("/api/payments", paymentRoutes); // Payment routes

// Serve Static Assets (For Production)
if (process.env.NODE_ENV === "production") {
    const path = require("path");
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
