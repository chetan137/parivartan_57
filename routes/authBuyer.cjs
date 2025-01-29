const express = require("express");
const passport = require("passport");
const router = express.Router();

// Google OAuth Login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth Callback
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("http://localhost:5173/dashboard"); // Redirect to frontend dashboard
    }
);

module.exports = router;
