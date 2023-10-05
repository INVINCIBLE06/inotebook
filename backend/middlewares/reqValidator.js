const User = require('../models/User');

exports.emailvalidation = async (req, res, next) => 
{
    const email = await req.body.email // Assigning the user entered email to email variable
    // console.log(req.body)

    //checking
    if (isvalidEmail(email)) // Here the checking of the email value is done
    {
        next();  // If correct then next()
    } 
    else 
    {
        res.status(401).json
        ({
            message: "Invalid email"   // Or error message
        });
    }
};

const isvalidEmail = (email) => 
{
    const regex = (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?$/);    
    if (regex.test(email)) 
    {
        const domain = email.split('@')[1]; // get domain name after '@' symbol
        const domainParts = domain.split('.'); // split domain name by '.' separator
        // console.log(domainParts); // output: ['gmail', 'com', 'com']
        if(domainParts[1] === domainParts[2])
        {
            // console.log('Both the domain names are same. It is not a valid email');
            return false
        }
        else
        {
            // console.log('Valid Email');
            return true;
        }
    } 
    else
    {
        // console.log('Invalid Email');
        return false
    }
};

const isValidDateOfBirth = (DOB) =>  
{
    return DOB.match(/^(?:19|20)\d{2}[/-](?:0[1-9]|1[0-2])[/-](?:0[1-9]|[12][0-9]|3[01])$/);
};

const isValidPassword = (password) => 
{
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,12}$/.test(password);
}

const isValidContact_No = (Contact_No) => 
{
    return Contact_No.match(/^(\+?91|0)?[6-9]\d{9}$/);
}

const isValidUsername = (username) => 
{
    return username.match(/^[a-zA-Z0-9]{8,12}$/);
}

exports.ValidateSignUpRequestBody = async (req, res, next) =>
{
    try
    {
        if(isvalidEmail(req.body.email) != true)
        {
            return res.status(400).send
            ({
                message : "Email is not in correct format. Please write a email in correct form"
            }); 
        }
        else if(isValidPassword(req.body.password) != true)
        {
            // console.log(!!isValidPassword(req.body.password)); 
            return res.status(400).send
            ({
                message : "Failed ! Not a valid password. Password must be 8 to 12 character containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
            });
        }
        else if(isValidContact_No(req.body.phone_no) != true)
        {
            // console.log(!!isValidContact_No(req.body.contact_no)); 
            return res.status(400).send
            ({
                message : "The contact number is not in the correct format"
            });
        }
        else if(isValidDateOfBirth(req.body.date_of_birth) != true)
        {
            // console.log(!!isValidDateOfBirth(req.body.date_of_birth));
            return res.status(400).send
            ({
                message : "The date of birth is not valid. Please enter the enter in this format YYYY/MM/DD" 
            });
        }        
        else if(isValidUsername(req.body.username) != true)
        {
            // console.log(!!isValidUsername(req.body.username));
            return res.status(400).send
            ({
                message : "username is not valid. It must consist atleat 8 letter and less than 16 letters" 
            });
        }
        else
        {
            next();
        }
    }
    catch(err)
    {
        console.log(" #### Error while validation user signup attributes like date of birth, password, contact number, confirm password, and email #### ", err.message);
        return res.status(500).send
        ({
            message : "Internal server error while validation user signup attributes like date of birth, password, contact number, confirm password, and email"
        });
    }
};

exports.checkValueEntered = (feildName, messageName) => (req, res, next) =>
{
    if(!feildName)
    {
        return res.json
        ({
            code : 400,
            status : false,
            message : `${messageName} is not entered`
        })
    }
    else
    {
        next();
    }
}

exports.checkSignupBodyPresent = (req, res, next) =>
{
    this.checkValueEntered(req.body.name, 'Name')(req, res, next);
    this.checkValueEntered(req.body.email, 'Email')(req, res, next);
    this.checkValueEntered(req.body.username, 'Username')(req, res, next);~~
    this.checkValueEntered(req.body.password, 'Password')(req, res, next);
    this.checkValueEntered(req.body.phone_no, 'Phone number')(req, res, next);
    this.checkValueEntered(req.body.date_of_birth, 'Date of birth')(req, res, next);
    next();
};

exports.noteBodyValidator = async (req, res, next) =>
{
    this.checkValueEntered(req.body.title, 'Title')(req, res, next);
    this.checkValueEntered(req.body.tag, 'Tag')(req, res, next);
    this.checkValueEntered(req.body.description, 'Description')(req, res, next);
    next();
};

exports.checkDuplicateValue = (field, value) => async (req, res, next) => {
    try
    {
        console.log(await User.findOne({ [field]: value }));

        let checkValue = await User.findOne({ [field]: value });
        console.log('Check Value: ', checkValue);

        if (checkValue)
        {
            return res.status(400).json
            ({
                code: 400,
                status: false,
                message: `${field} is already present.`
            });
        } 
        else
        {
            next();
        }
    }
    catch (error)
    {
        console.error('Error:', error); // Log the error for debugging
        return res.status(500).json
        ({
            code: 500,
            status: false,
            message: 'Internal Server Error'
        });
    }
};


exports.checkDuplicateEntryWhileSignup = async (req, res, next) =>
{
    this.checkDuplicateValue('email', req.body.email)(req, res, next);
    this.checkDuplicateValue('username', req.body.username)(req, res, next);
    this.checkDuplicateValue('phone_no', req.body.phone_no)(req, res, next);
    next();
};
