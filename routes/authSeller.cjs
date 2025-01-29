const express = require("express");
const passport = require("passport");
const Seller = require("../models/Seller.cjs");
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const seller = new Seller(req.body);
        await seller.save();
        res.status(201).json({ message: "Seller registered successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
    res.json({ message: "Logged in successfully", seller: req.user });
});

module.exports = router;
