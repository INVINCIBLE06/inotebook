import { useState } from "react";
import NoteContext from "./noteContext";
import * as url  from "./urlhelper";


const NoteState = (props) => {
  const note = [
    {
      "id": 1,
      "title": "Saurabh Pande",
      "description": "BJP",
    },
    {
      "id": 2,
      "title": "Xi Jinping",
      "description": "Communist Party",
    },
    {
      "id": 3,
      "title": "Joe Baiden",
      "description": "Democratic Party",
    },
    {
      "id": 4,
      "title": "Donald Trump",
      "description": "Republican Party",
    }
  ];

  // Add a Note

  const addNote = (title, description, tag) =>
  {
    // TODO API CALL
    let note = {
      "id": 5,
      "title": title,
      "description": description,
    }
    setNotes(notes.concat(note));
  }

  // Delete a Note
  const deleteNode = (id) =>
  {
    console.log(`Deleing the node`, id);
    const newNotes = notes.filter((note) => {return note.id !== id})
    setNotes(newNotes)
  }

  // Edit a Note
  const editNode = async (id, title, description, tag) =>
  {
    
    const response = await fetch(url.PUT_EDIT_NOTE, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data), 
    });
    
    for (let index = 0; index < notes.length; index++) 
    {
      const element = notes[index];
      if(element.id === id)
      {
        element.title = title,
        element.description = description,
        element.tag = tag
      }      
    }
  }


  const [notes, setNotes] = useState(note);
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNode, editNode }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;


