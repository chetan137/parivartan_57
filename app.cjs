const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
require("dotenv").config();

// Import Passport Strategies
require("./config/passport.cjs"); // Seller Local Strategy
require("./config/googleAuth.cjs"); // Buyer Google OAuth Strategy

// Import Routes
const sellerAuthRoutes = require("./routes/authSeller.cjs");
const buyerAuthRoutes = require("./routes/authBuyer.cjs");
const sellerRoutes = require("./routes/seller.cjs");
const buyerRoutes = require("./routes/buyer.cjs");
const paymentRoutes = require("./routes/payment.cjs");

// Initialize Express App
const app = express();

// Database Connection
const mongoURI = process.env.MONGO_URI || process.env.MONGO2;
mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// Middleware
app.use(
    cors({
        origin: "http://localhost:5173", // Your frontend URL
        credentials: true, // Allow cookies & credentials
    })
);
app.use(express.json());
app.use(bodyParser.json());

// Session Middleware (MongoDB Session Storage)
app.use(
    session({
        secret: process.env.SESSION_SECRET || "mycodesecret",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: mongoURI }),
        cookie: {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24, // 1 Day
        },
    })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Flash Messages Middleware
app.use(flash());

// Global Middleware to Store User & Flash Messages in `res.locals`
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user || null; // Current authenticated user
    res.locals.User2 = req.body || {}; // Request body data
    next();
});

// API Routes
app.use("/api/auth/seller", sellerAuthRoutes);
app.use("/api/auth/buyer", buyerAuthRoutes);
app.use("/api/sellers", sellerRoutes);
app.use("/api/buyers", buyerRoutes);
app.use("/api/payments", paymentRoutes);

// Serve Static Files in Production
if (process.env.NODE_ENV === "production") {
    const path = require("path");
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
