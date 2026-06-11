const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Humne process.env.MONGO_URI ki jagah direct local link likh diya
        const localURI = "mongodb://127.0.0.1:27017/travel_bharat";
        const conn = await mongoose.connect(localURI);
        console.log(`📊 Local MongoDB Connected Successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Database Connection Error: ${error.message}`);
        process.exit(1); 
    }
};

module.exports = connectDB;