const mongoose = require('mongoose');

const NotesSchema = new Schema
({
    id :
    {
        type : String,
        required : true,
        autoIncrement : true,
        primaryKey: true  
    },
    title : 
    {
        type : String,
        required :true
    },
    description :
    {
        type : String,
        required : true,
        unique : true
    },
    tag :
    {
        type : String,
        required : true
    },
    created_At :
    {
        type : Date,
        default : Date.now
    },
    updated_At :
    {
        type : Date,
        default : Date.now
    }


    
});


module.exports = mongoose.model('notes', NotesSchema);