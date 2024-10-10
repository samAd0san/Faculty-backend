const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const mongoDbURL = process.env.MONGODB_URI; // Use the URI from the .env file

const connectDB = async () => {
    try {
        await mongoose.connect(mongoDbURL);
        console.log('Connection Successful');
    } catch (err) {
        console.error('Received an Error connecting to the database', err);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;