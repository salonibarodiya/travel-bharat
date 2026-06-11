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
}, { timestamps: true }); 

module.exports = mongoose.model('State', stateSchema);
