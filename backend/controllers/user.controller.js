////////////////////////////////////////////////////////////////////////////////////////
//                                                                                    //                                                                                   //
////////////////////////////////////////////////////////////////////////////////////////


const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');


/**
 * The below function is for creating new users.
 */
exports.signup = async (req, res, next) =>
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
            phone_no : userCreated.phone_no,
            date_of_birth : userCreated.date_of_birth,
        }
        res.status(201).send
        ({
            message : "User Added Successfully"
        }); 
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

/**
 * The below function is sign in of the user
 */

exports.login = async (req, res) =>
{
    const { username, email, phone_no, password } = req.body;
     let condition = null;
    if(username)
    {
        condition = { username: username };
    }
    else if(email)
    {
        condition = { email: email };
    }
    else if(phone_no)
    {
        condition = { phone_no : phone_no };
    }
    else
    {
        return res.status(400).send
        ({ 
            message: "Invalid login credentials" 
        });
    }

    // console.log(condition);

    const user = await User.findOne({ username : req.body.username });
    // const user = await User.findOne({condition});

    if(!user)
    {
        return res.status(404).send
        ({
            message : "User Not found"
        });
    }
        
    var isValidPassword = bcrypt.compareSync(password, user.password);
     /**
     * Create the JWT toekn
     */
    // console.log("Here", user._id);

    const data = {
        user : {
            id : user.id
        }
    }

    const token = jwt.sign(data, authConfig.secret)

    if(!isValidPassword)
    {
        return res.status(401).send 
        ({
            message : "Invalid Password"
        });
    }
    else
    {
        return res.status(200).send 
        ({
            message : "Login Successfully Done",
            token : token
        });
    }
}  