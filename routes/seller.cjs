const express = require('express');
const { Seller } = require('../models/Seller.cjs');
const router = express.Router();

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
