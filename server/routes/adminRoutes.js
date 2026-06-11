const express = require('express');
const router = express.Router();
const State = require('../models/State'); 
const Place = require('../models/Place');


router.post('/add-state', async (req, res) => {
    try {
        const { name, image, description } = req.body;
        const newState = new State({ name, image, description });
        await newState.save();
        res.status(201).json({ success: true, data: newState });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


router.post('/add-place', async (req, res) => {
    try {
        const newPlace = new Place(req.body);
        await newPlace.save();
        res.status(201).json({ success: true, data: newPlace });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


router.delete('/state/:id', async (req, res) => {
    try {
        const stateId = req.params.id;
        const deletedState = await State.findByIdAndDelete(stateId);
        
        if (!deletedState) {
            return res.status(404).json({ success: false, message: "State nahi mili!" });
        }
        
        await Place.deleteMany({ state: stateId });
        res.status(200).json({ success: true, message: "State aur places delete ho gaye!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete('/place/:id', async (req, res) => {
    try {
        const placeId = req.params.id;
        const deletedPlace = await Place.findByIdAndDelete(placeId);
        
        if (!deletedPlace) {
            return res.status(404).json({ success: false, message: "Place nahi mila!" });
        }
        res.status(200).json({ success: true, message: "Place successfully delete ho gaya!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
