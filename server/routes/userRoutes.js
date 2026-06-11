const express = require('express');
const router = express.Router();
const State = require('../models/State');
const Place = require('../models/Place');

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

router.get('/places/:stateId', async (req, res) => {
    try {
        const { stateId } = req.params;
        const { category } = req.query; 

    
        let query = { state: stateId };

    
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


router.get('/place-details/:placeId', async (req, res) => {
    try {
        const { placeId } = req.params;
        
        
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
