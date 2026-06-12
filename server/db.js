const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Render par process.env.MONGO_URI chalega, local laptop par localhost chalega
        const dbURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/travel_bharat";
        
        const conn = await mongoose.connect(dbURI);
        console.log(`📊 MongoDB Connected Successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Database Connection Error: ${error.message}`);
        process.exit(1); 
    }
};

module.exports = connectDB;