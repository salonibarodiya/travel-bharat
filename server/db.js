const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        
<<<<<<< HEAD
        const localURI = "mongodb://127.0.0.1:27017/travel_bharat";
        const conn = await mongoose.connect(localURI);
        console.log(`📊 Local MongoDB Connected Successfully: ${conn.connection.host}`);
=======
        const dbURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/travel_bharat";
        
        const conn = await mongoose.connect(dbURI);
        console.log(`📊 MongoDB Connected Successfully: ${conn.connection.host}`);
>>>>>>> d778de5 (fix: update db connection to use cloud URI on production)
    } catch (error) {
        console.error(`❌ Database Connection Error: ${error.message}`);
        process.exit(1); 
    }
};

module.exports = connectDB;
