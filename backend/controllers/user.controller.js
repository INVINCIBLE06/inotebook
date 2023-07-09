////////////////////////////////////////////////////////////////////////////////////////
//                                                                                    //                                                                                   //
////////////////////////////////////////////////////////////////////////////////////////






const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

/**
 * The below function is for creating new users.
 */
exports.signup = async (req, res) =>
{
    // Add the req.body data in userObj object
    const userObj = 
    {
        name : req.body.name,
        email : req.body.email,
        username : req.body.username,
        password : bcrypt.hashSync(req.body.password, 8),
        phone_no : req.body.phone_no,
        date_of_birth : req.body.date_of_birth
    };

    try
    {
        // The below line will be used for creating the new user
        const userCreated = await User.create(userObj);

        // The response variable will have the data. Which will be displayed when the signup is successfully done
        const response = 
        {
            name : userCreated.name,
            email : userCreated.email,
            username : userCreated.username,
            // password : userCreated.password,
            phone_no : userCreated.phone_no,
            date_of_birth : userCreated.date_of_birth,
        }
        console.log("User added"),
        res.status(201).send(response); // Response line

    }
    catch(err)
    {
        console.log("Some error happened", err.message);
        res.status(500).send
        ({
            message : "Some internal server error"
        });
    }
};