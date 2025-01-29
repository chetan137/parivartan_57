const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Seller = require("../models/Seller.cjs");
const bcrypt = require("bcryptjs");

passport.use(
    new LocalStrategy({ usernameField: "mobileNo" }, async (mobileNo, password, done) => {
        try {
            const seller = await Seller.findOne({ mobileNo });
            if (!seller) return done(null, false, { message: "Seller not found" });

            const isMatch = await bcrypt.compare(password, seller.password);
            if (!isMatch) return done(null, false, { message: "Incorrect password" });

            return done(null, seller);
        } catch (err) {
            return done(err);
        }
    })
);

passport.serializeUser((seller, done) => {
    done(null, seller.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const seller = await Seller.findById(id);
        done(null, seller);
    } catch (err) {
        done(err);
    }
});
