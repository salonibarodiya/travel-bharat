const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, "City name is required"],
        trim: true 
    },
    state: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'State', // Yeh link hai State model ke sath
        required: [true, "City must belong to a State"] 
    },
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('City', citySchema);