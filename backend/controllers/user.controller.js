const User = require('../models/User');
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) =>
{
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
        const userCreated = await User.create(userObj);

        const response = 
        {
            name : userCreated.name,
            email : userCreated.email,
            username : userCreated.username,
            // password : userCreated.password,
            phone_no : userCreated.phone_no,
            date_of_birth : userCreated.date_of_birth,
        }
        res.status(201).send(response);

    }
    catch(err)
    {
        console.log("Some error happened", err.message);
        res.status(500).send
        ({
            message : "Some internal server error"
        })
    }
    



};