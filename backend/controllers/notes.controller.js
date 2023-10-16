const Note = require('../models/Notes');
const { checkout } = require('../routes/notes.route');

exports.getAllNotes = async (user, req, res, next) =>
{
    try 
    {
        const notes = await Note.find({ user : user });
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
        // The below line will be used for creating the new note
        const noteCreated = await Note.create(reqObj);
        // The response variable will have the data. Which will be displayed when the signup is successfully done
        const response = 
        {
            user : noteCreated.user,
            title : noteCreated.title,
            description : noteCreated.description,
            tag : noteCreated.tag,
            created_at : noteCreated.created_At
        };

        res.status(201).send
        ({
            message : "Note Added Successfully",
            notes : response 
        });
    }
    catch (error)
    {
        console.error(error.message);
        res.status(500).send("Internal Server Error While Adding New Note");   
    }
};

exports.UpdateExistingNote = async (userId, req, res, next) =>
{  
    try
    {
        // The below line will be used for creating the new note
        const notePresent = await Note.findOne({ _id : req.params.id});

        // The response variable will have the data. Which will be displayed when the signup is successfully done
        if(notePresent.length = 0)
        {
           res.send
           ({
                code : 400,
                status : false,
                message : `No note present with the id`        
           }); 
        }
        else
        {
            notePresent.title = req.body.title != undefined ? req.body.title : notePresent.title;
            notePresent.description = req.body.description != undefined ? req.body.description : notePresent.description;
            notePresent.tag = req.body.tag != undefined ? req.body.tag : notePresent.tag
            const updateNote = await notePresent.save();
            res.status(200).send(updateNote);
        }
    }
    catch (error)
    {
        console.error(error.message);
        res.status(500).send("Internal Server Error While Updating The Existing Note");   
    }
};

exports.deleteNote = async (userId, req, res, next) =>
{
    try 
    {
        // console.log(req.body.id);
        const notePresent = await Note.findOne({ _id : req.params.id});
        // console.log(`Note details at the time of delete: `, notePresent);
        if(!notePresent)
        {
           res.send
           ({
                code : 400,
                status : false,
                message : `No note present with the id`        
           }); 
        }
        else
        {
            let checkNote = await notePresent.deleteOne();
            console.log(checkNote);
            if(checkNote)
            {
                res.send
                ({
                    code : 200,
                    status : false,
                    message : "Note is successfully deleted"
                });
            }
            else
            {
                res.send
                ({
                    code : 200,
                    status : false,
                    message : "Error while deleting the note"
                })
            }            
        }
        
    }
    catch (error)
    {
        console.error(error.message);
        res.status(500).send("Internal server error while deleting the node");        
    }
}