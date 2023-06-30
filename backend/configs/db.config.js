const mongoose = require('mongoose');


const connectToMongo = () =>
{
    mongoose.connect(process.env.DBURI, () =>
    {
        console.log("Connected to mongo successfully");
    });
}

module.exports = connectToMongo;