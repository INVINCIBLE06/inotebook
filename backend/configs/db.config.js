const mongoose = require('mongoose');
require('dotenv').config(); // Comment: Loads environment variables from a .env file if present.

const connectToMongo = async () => 
{
    try
    {
        await mongoose.connect(process.env.DBURI);
        console.log("Connected to MongoDB successfully");
    }
    catch(error)
    {
        console.error("Failed to connect to MongoDB:", error);
    }
};

module.exports = connectToMongo;