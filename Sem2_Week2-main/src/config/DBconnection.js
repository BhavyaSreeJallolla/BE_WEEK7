const mongoose = require("mongoose");
require('dotenv').config();

const connectToDB = async () => {
    try {
        // Print the MONGO_URI to ensure it's being loaded
        const dbURI = process.env.MONGO_URI;
        console.log("Database URI:", dbURI);  // Debug log

        if (!dbURI) {
            throw new Error('MONGO_URI is not defined in .env');
        }
        await mongoose.connect(dbURI);
        console.log("Database connected");
    } catch (error) {
        console.error("ERROR in connecting!", error);
    }
};

module.exports = connectToDB;
