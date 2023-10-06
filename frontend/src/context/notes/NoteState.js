import { useState } from "react";
import NoteContext from "./noteContext";
import * as url  from "./urlhelper";


const NoteState = (props) => 
{
  const note = []
  const [notes, setNotes] = useState(note);

  // Get All Notes
  const getNotes = async() =>
  {
    console.log(url.GET_ALL_NOTE);
    const response = await fetch(url.GET_ALL_NOTE,
    {
      method: 'GET',
      headers: 
      {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxZjkwMzkwNGVlZWZlMDU4M2ZhMDNiIn0sImlhdCI6MTY5NjU2NzkwN30.121fzT1WXjFq5KZamC-UiZbB1vJvxEGZymaGOjGrPGg"
      }
    });
    console.log(response);
  }


  // Add a Note
  const addNote = async (title, description, tag) =>
  {
    // TODO API CALL
    const response = await fetch(url.POST_ADD_NOTE,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxZjkwMzkwNGVlZWZlMDU4M2ZhMDNiIn0sImlhdCI6MTY5NjU2NzkwN30.121fzT1WXjFq5KZamC-UiZbB1vJvxEGZymaGOjGrPGg"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = response.json();
    console.log('Adding a new note');
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
    const response = await fetch(url.PUT_EDIT_NOTE,
    {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers:
      {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({title, description, tag}),
    });

    const json = response.json();
    
    for (let index = 0; index < notes.length; index++) 
    {
      const element = notes[index];
      if(element.id === id)
      {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }      
    }
  }
  
  
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNode, editNode, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;


