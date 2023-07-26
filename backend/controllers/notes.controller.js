const Notes = require('../models/Notes');
const { login } = require('./user.controller');


exports.getAllNotes = async (user, req, res, next) =>
{
    try 
    {
        const notes = await Notes.find({ user : req.user.id });
        res.json(notes); 
    }
    catch (error)
    {
        console.error(error.message);
        res.status(500).send("Internal Server Error");        
    }
}