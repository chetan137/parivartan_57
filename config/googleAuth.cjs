const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Buyer = require("../models/Buyer.cjs");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let buyer = await Buyer.findOne({ googleAuthId: profile.id });

                if (!buyer) {
                    buyer = new Buyer({
                        email: profile.emails[0].value,
                        googleAuthId: profile.id,
                    });
                    await buyer.save();
                }

                done(null, buyer);
            } catch (err) {
                done(err, null);
            }
        }
    )
);

passport.serializeUser((buyer, done) => {
    done(null, buyer.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const buyer = await Buyer.findById(id);
        done(null, buyer);
    } catch (err) {
        done(err);
    }
});
