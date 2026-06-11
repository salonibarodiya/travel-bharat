const express = require('express');
const router = express.Router();
const State = require('../models/State');
const Place = require('../models/Place');

// ─── 1. API: SAARI STATES KI LISTING (Home Page ke liye) ───
// Route: GET http://localhost:5000/api/users/states
router.get('/states', async (req, res) => {
    try {
        const states = await State.find(); // Database se saari states nikalna
        res.status(200).json({
            success: true,
            count: states.length,
            data: states
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ─── 2. API: STATE-WISE TOURIST PLACES FILTERS KE SATH ───
// PRD: Filter destinations by category (Heritage, Nature, etc.)
// Route: GET http://localhost:5000/api/users/places/:stateId
router.get('/places/:stateId', async (req, res) => {
    try {
        const { stateId } = req.params;
        const { category } = req.query; // Query parameter for filters

        // Basic query structure
        let query = { state: stateId };

        // PRD Requirement: Agar user ne category filter select kiya hai
        if (category) {
            query.category = category;
        }

        const places = await Place.find(query).populate('state', 'name');
        
        res.status(200).json({
            success: true,
            count: places.length,
            data: places
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ─── 3. API: SINGLE TOURIST PLACE KI DETAILS (Detailed Destination Page) ───
// Route: GET http://localhost:5000/api/users/place-details/:placeId
router.get('/place-details/:placeId', async (req, res) => {
    try {
        const { placeId } = req.params;
        
        // Find place by ID and get State name too
        const place = await Place.findById(placeId).populate('state', 'name');
        
        if (!place) {
            return res.status(404).json({ success: false, message: "Tourist place not found!" });
        }

        res.status(200).json({
            success: true,
            data: place
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;