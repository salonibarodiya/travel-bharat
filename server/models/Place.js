const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  
  // ❌ Pehle yahan ObjectId raha hoga, use hata kar simple String kar do:
  city: { type: String, required: true }, 
  
  state: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true },
  category: { type: String, enum: ['Heritage', 'Nature', 'Religious', 'Modern'], required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  bestTimeToVisit: { type: String, default: "October to March" },
  timings: { type: String, default: "Open 24/7" },
  entryFees: { type: String, default: "Free Entry" },
  mapLink: { type: String, default: "" },
  nearbyAttractions: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Place', placeSchema);