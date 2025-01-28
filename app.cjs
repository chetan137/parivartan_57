const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const sellerRoutes = require('./routes/seller.cjs');
const buyerRoutes = require('./routes/buyer.cjs');
const cors = require("cors");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const session = require("express-session");

// const listingRoutes = require('./routes/listing.cjs');
const paymentRoutes = require('./routes/payment.cjs');
require('dotenv').config();




const app = express();



const mongoURI2= process.env.MONGO;

const mongoURI = "mongodb+srv://23106034:I7hSKlX9bvZD0NXQ@chetan.meqsl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";




mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));
// Middleware

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    credentials: true,
}));
app.use(express.json());
app.use(bodyParser.json());

// Sessions
app.use(session({
    secret: process.env.SESSION_SECRET || 'mycodesecret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: mongoURI }), // Persist sessions in MongoDB
    cookie: {
        secure: false, // Set to true in production with HTTPS
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport serialization
passport.serializeUser((user, done) => {

    done(null, user._id); // Use MongoDB's `_id` as the identifier
});

passport.deserializeUser(async (id, done) => {

    try {
        const user = await User.findById(id); // Fetch user by ID
        if (user) {

            done(null, user); // Attach user object to `req.user`
        } else {
            done(null, false); // No user found
        }
    } catch (error) {
        console.error("Error during deserialization:", error);
        done(error, null);
    }
});



app.use('/api/sellers', sellerRoutes);
app.use('/api/buyers', buyerRoutes);
// app.use('/api/listings', listingRoutes);
app.use('/api/payments', paymentRoutes);

// Start Server


if (process.env.NODE_ENV === "production") {
    const path = require("path")
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
