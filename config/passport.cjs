const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Seller = require("../models/Seller.cjs");
const bcrypt = require("bcryptjs");

passport.use(
    new LocalStrategy({ usernameField: "mobileNo" }, async (mobileNo, password, done) => {
        try {
            const seller = await Seller.findOne({ mobileNo });

            if (!seller) {
                console.log("❌ Seller not found for mobile:", mobileNo);
                return done(null, false, { message: "Seller not found" });
            }

            console.log("✅ Seller Found:", seller);

            console.log("🔑 Entered Password:", password);
            console.log("🔒 Hashed Password from DB:", seller.password);

            const isMatch = await bcrypt.compare(password, seller.password);

            if (!isMatch) {
                console.log("❌ Password mismatch");
                return done(null, false, { message: "Incorrect password" });
            }

            console.log("✅ Login Successful");
            return done(null, seller);
        } catch (err) {
            console.error("❌ Error in Passport Strategy:", err);
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

module.exports = passport;
