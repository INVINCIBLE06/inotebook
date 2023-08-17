const Note = require('../models/Notes');

exports.getAllNotes = async (user, req, res, next) =>
{
    try 
    {
        // console.log(user);
        const notes = await Note.find({ user : user });
        // console.log(notes);
        if(notes.length == 0)
        {
            console.log(`There are no notes available for this token now`);
            res.status(200).json
            ({
                code : 400,
                status : false,
                message : `There are no notes available for this token now`,
                data : notes
            });
        }
        else
        {
            console.log('Notes data fetched successfully');
            res.status(200).json
            ({
                code : 200,
                status : false,
                message : "Data fetched successfully",
                data : notes
            });
        }    
    }
    catch (error)
    {
        console.error(error.message);
        res.status(500).send("Internal Server Error while fetching all the notes");        
    }
};

exports.AddNewNote = async (userId, req, res, next) =>
{
    const reqObj = 
    {
        user : userId,
        title : req.body.title,
        description : req.body.description,
        tag : req.body.tag
    }  
    try
    {
        // console.log(userId);
        // console.log(reqObj);
        // The below line will be used for creating the new note
        const noteCreated = await Note.create(reqObj);
        // The response variable will have the data. Which will be displayed when the signup is successfully done
        // console.log(`Note created: `, noteCreated);
        const response = 
        {
            user : noteCreated.user,
            title : noteCreated.title,
            description : noteCreated.description,
            tag : noteCreated.tag,
            created_at : noteCreated.created_At
        };

        // console.log('Note Added');
        res.status(201).send
        ({
            message : "Note Added Successfully",
            notes : response 
        }); // Response line
    }
    catch (error)
    {
        console.error(error.message);
        res.status(500).send("Internal Server Error While Adding New Note");   
    }
};


exports.UpdateExistingRoute = async (req, res, next) =>
{
    const reqObj = 
    {
        title : req.body.title,
        description : req.body.description,
        tag : req.body.tag
    }  
    try
    {
        // The below line will be used for creating the new note
        const noteCreated = await Note.create(reqObj);

        // The response variable will have the data. Which will be displayed when the signup is successfully done

        const response = 
        {
            title : noteCreated.title,
            description : noteCreated.description,
            tag : noteCreated.tag,
            created_at : noteCreated.created_At
        };

        // console.log('Note Added');
        res.status(201).send
        ({
            message : "User Added Successfully",
            notes : response 
        }); // Response line
    }
    catch (error)
    {
        console.error(error.message);
        res.status(500).send("Internal Server Error While Updating The Existing Note");   
    }
};