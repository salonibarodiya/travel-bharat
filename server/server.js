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
// 🚀 MONOLITH DEPLOYMENT PATH FIX (EXPRESS V5)
// ==========================================

// FIXED: '__dirname' ke sath '../client/dist' lagaya hai kyunki server folder se ek kadam bahaar nikalna hai
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

// FIXED: Fallback route mein bhi path theek kar diya hai
app.use((req, res, next) => {
    if (req.url.startsWith('/api')) {
        return next();
    }
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

// ==========================================

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Server is flying high on port ${PORT}`);
    });
}

module.exports = app;