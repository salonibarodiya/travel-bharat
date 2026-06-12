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

// Tumhare saare API routes
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes'); 

app.use('/api/admin', adminRoutes); 
app.use('/api/users', userRoutes); 

// ==========================================
// 🚀 SINGLE LINK DEPLOYMENT SETUP (FINAL FIXED FOR EXPRESS V5)
// ==========================================

// 1. Static files serve karne ke liye path bilkul sahi hai
app.use(express.static(path.join(__dirname, '../client/dist')));

// 2. SAFE FALLBACK ROUTE: Kisi bhi regex ya wildcard character ke bina, 
// yeh middleware har us request ko catch karega jo upar ke API routes se match nahi hui,
// aur chupchaap tumhari frontend ki index.html bhej dega.
app.use((req, res, next) => {
    // Agar request kisi API call ke liye hai toh use aage jaane do
    if (req.url.startsWith('/api')) {
        return next();
    }
    // Baaki sabhi frontend routing/pages ke liye index.html serve karo
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// ==========================================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is flying high on port ${PORT}`);
});