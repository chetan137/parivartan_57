const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const Seller = require("../models/Seller.cjs");

const router = express.Router();

// 📌 Seller Registration
router.post("/register", async (req, res) => {
    try {
        console.log("📌 Received Registration Data:", req.body);

        const { mobileNo, password, name, state, city, pincode, categories, bankDetails } = req.body;

        // Validate required fields
        if (!mobileNo || !password || !name || !state || !city || !pincode || !categories || !bankDetails) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if mobile number already exists
        const existingSeller = await Seller.findOne({ mobileNo });
        if (existingSeller) {
            return res.status(400).json({ error: "Mobile number already registered" });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const newSeller = new Seller({
            mobileNo,
            password: hashedPassword,
            name,
            state,
            city,
            pincode,
            categories,
            bankDetails,
        });

        await newSeller.save();
        res.json({ message: "Seller registered successfully" });

    } catch (error) {
        console.error("❌ Error in Seller Registration:", error);

        // Handle Mongoose validation errors
        if (error.name === "ValidationError") {
            return res.status(400).json({ error: error.message });
        }

        res.status(500).json({ error: "Server error. Please try again." });
    }
});

// 📌 Seller Login
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return res.status(500).json({ error: "Server error. Try again." });
        if (!user) return res.status(401).json({ error: info.message || "Invalid credentials" });
   if (!user) {
            console.error("Invalid Credentials:", info);
            return res.status(401).json({ error: info.message || "Invalid credentials" });
        }
        req.login(user, (loginErr) => {
            if (loginErr) return res.status(500).json({ error: "Login failed. Try again." });

            return res.json({
                message: "Login successful",
                seller: { _id: user._id, name: user.name, mobileNo: user.mobileNo },
            });
        });
    })(req, res, next);
});

// 📌 Seller Logout
router.post("/logout", (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ error: "Logout failed" });
        res.json({ message: "Logged out successfully" });
    });
});

module.exports = router;
