const express = require('express');
const cors = require('cors');
const path = require('path'); // <-- Yeh line add ki hai path handle karne ke liye
require('dotenv').config();
const connectDB = require('./db');

const app = express();

// Database connection
connectDB();

app.use(cors());
app.use(express.json());

// Tumhare purane API routes bilkul waise hi rahenge
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes'); 

app.use('/api/admin', adminRoutes); 
app.use('/api/users', userRoutes); 

// ==========================================
// 🚀 SINGLE LINK DEPLOYMENT SETUP (FRONTEND IN BACKEND)
// ==========================================

// 1. Express ko batao ki frontend ke dist folder ki HTML/CSS files kahan hain
// (Hum assume kar rahe hain ki root par 'client' folder hai aur uske andar 'dist')
app.use(express.static(path.join(__dirname, '../client/dist')));

// 2. Jo purana app.get('/') tha, use badal kar sirf ek fallback route bana diya.
// Agar koi bhi page reload hoga (jaise /login, /explore), toh yeh seedhe frontend ki index.html load karega
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// ==========================================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is flying high on port ${PORT}`);
});