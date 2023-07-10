const mongoose = require('mongoose');
const { Schema } = mongoose

const UserSchema = new Schema
({
    name : 
    { 
        type : String,
        required :true 
    },
    email :
    {
        type : String,
        required : true,
        unique : true
    },
    username :
    {
        type : String,
        required : true,
        unique : true
    },
    password :
    {
        type : String,
        required : true
    },
    phone_no :
    {
        type : String,
        required : true,
        unique : true 
    },
    date_of_birth :
    {
        type : String,
        required : true,
        allowNull : false
    },
    userStatus : 
    {
        type : String,
        required : true,
        default : 'ACTIVE',
        enum : ['ACTIVE','INACTIVE']
    },
    created_At :
    {
        type : Date,
        default : Date.now,
        immutable : true
    },
    updated_on :
    {
        type : Date,
        default : Date.now
    }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;


