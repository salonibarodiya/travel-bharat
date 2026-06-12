const express = require('express');
const cors = require('cors');
const path = require('path'); 
require('dotenv').config();
const connectDB = require('./db');

const app = express();

// Database connection
connectDB();

app.use(cors());
app.use(express.json());

// Tumhare API routes
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes'); 

app.use('/api/admin', adminRoutes); 
app.use('/api/users', userRoutes); 

// ==========================================
// 🚀 SINGLE LINK DEPLOYMENT SETUP (FIXED)
// ==========================================

// 1. Static files serve karne ke liye path bilkul sahi hai
app.use(express.static(path.join(__dirname, '../client/dist')));

// 2. CRITICAL FIX: '*' ko badal kar '(.*)' kar diya hai taaki Express v5 router crash na ho
app.get('(.*)', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// ==========================================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is flying high on port ${PORT}`);
});