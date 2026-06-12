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

// API Routes
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes'); 

app.use('/api/admin', adminRoutes); 
app.use('/api/users', userRoutes); 

// ==========================================
// 🚀 MONOLITH DEPLOYMENT (FRONTEND + BACKEND)
// ==========================================

// 1. Express ko client/dist folder ka sahi path batao
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// 2. SAFE FALLBACK ROUTE: Kisi bhi regex ke bina, jo api nahi hai use frontend par bhejo
app.use((req, res, next) => {
    if (req.url.startsWith('/api')) {
        return next();
    }
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// ==========================================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is flying high on port ${PORT}`);
});