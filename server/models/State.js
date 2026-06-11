const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, "State name is required"], 
        unique: true,
        trim: true 
    },
    description: { 
        type: String, 
        required: [true, "State description is required"] 
    },
    image: { 
        type: String, 
        required: [true, "State banner image URL is required"] 
    }
}, { timestamps: true }); // Timestamps automatically batayega ki kab data add/update hua

module.exports = mongoose.model('State', stateSchema);