const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');

const app = express();

// Connect to Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// ─── ROUTES INTEGRATION ───
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes'); // Naya Import

app.use('/api/admin', adminRoutes); 
app.use('/api/users', userRoutes); // Naya Connection

// Base Route
app.get('/', (req, res) => {
res.status(200).json({
     success: true,
         message: "Travel Bharat API Server is running beautifully."
 });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is flying high on port ${PORT}`);
}); 