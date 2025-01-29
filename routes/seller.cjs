const express = require('express');
const { Seller } = require('../models/Seller.cjs');
const router = express.Router();
const { upload } = require("../config/cloudinary.cjs");





router.get("/", async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized. Please log in." });
        }

        const seller = await Seller.findById(req.user._id);
        if (!seller) {
            return res.status(404).json({ error: "Seller not found" });
        }

        res.json(seller);
    } catch (error) {
        console.error("Error fetching seller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.get("/:sellerId", async (req, res) => {
    try {
        const seller = await Seller.findById(req.params.sellerId);
        if (!seller) return res.status(404).json({ error: "Seller not found" });

        res.json(seller);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.post("/upload", upload.array("photos", 5), (req, res) => {
    try {
        const urls = req.files.map((file) => file.path);
        res.json({ urls });
    } catch (error) {
        res.status(500).json({ error: "Image upload failed" });
    }
});

// Create a new listing
router.post("/create", async (req, res) => {
    try {
        const { category, sellerId, data } = req.body;

        let listingData = { category, sellerId };

        if (category === "farmer") {
            listingData.farmer = {
                materialName: data.materialName,
                photos: data.photos || [],
                description: data.description,
                rate: data.rate,
                quantity: data.quantity,
            };
        } else if (category === "painter") {
            listingData.painter = {
                pictures: data.pictures || [],
                rate: data.rate,
            };
        }

        const newListing = new Listing(listingData);
        await newListing.save();

        res.status(201).json({ message: "Listing created successfully!" });
    } catch (error) {
        console.error("Error creating listing:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});





// Create a new seller
router.post('/', async (req, res) => {
    try {
        const seller = new Seller(req.body);
        await seller.save();
        res.status(201).json(seller);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get seller by ID
router.get('/:id', async (req, res) => {
    try {
        const seller = await Seller.findById(req.params.id);
        if (!seller) return res.status(404).json({ error: 'Seller not found' });
        res.json(seller);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
