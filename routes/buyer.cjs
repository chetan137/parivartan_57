const express = require('express');
const { Buyer } = require('../models/Buyer.cjs');
const router = express.Router();

// Create a new buyer
router.post('/', async (req, res) => {
    try {
        const buyer = new Buyer(req.body);
        await buyer.save();
        res.status(201).json(buyer);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
