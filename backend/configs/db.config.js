const mongoose = require('mongoose');
require('dotenv').config(); // Comment: Loads environment variables from a .env file if present.

const connectToMongo = async () => 
{
    mongoose.connect(process.env.DBURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => 
    {
        console.log('Connected to MongoDB');
    }).catch((error) => 
    {
        console.error('Error connecting to MongoDB:', error);
    });
};

module.exports = connectToMongo;