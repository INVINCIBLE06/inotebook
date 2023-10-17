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
    const response = await fetch(url.GET_ALL_NOTE,
    {
      method: 'GET',
      headers: 
      {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxZjkwMzkwNGVlZWZlMDU4M2ZhMDNiIn0sImlhdCI6MTY5NjU2NzkwN30.121fzT1WXjFq5KZamC-UiZbB1vJvxEGZymaGOjGrPGg"
      }
    });
    const json = await response.json();
    setNotes(json.data)
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
    const note = await response.json();
    setNotes(notes.concat(note.notes));
  }

  // Delete a Note
  const deleteNode = async (id) =>
  {
    console.log(`${url.DELETE_REMOVE_NOTE}${id}`);
    console.log(`Deleing the node`, id);
    const response = await fetch(`${url.DELETE_REMOVE_NOTE}${id}`,
      {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxZjkwMzkwNGVlZWZlMDU4M2ZhMDNiIn0sImlhdCI6MTY5NjU2NzkwN30.121fzT1WXjFq5KZamC-UiZbB1vJvxEGZymaGOjGrPGg"
        },
      });
      const json = await response.json();
      console.log(json);
    // const newNotes = notes.filter((note) => {return note._id !== id})
    // setNotes(newNotes);
  }

  // Edit a Note
  const editNode = async (id, title, description, tag) =>
  {
    console.log(`Id: `, id);
    const response = await fetch(`${url.PUT_EDIT_NOTE}${id}`,
    {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers:
      {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxZjkwMzkwNGVlZWZlMDU4M2ZhMDNiIn0sImlhdCI6MTY5NjU2NzkwN30.121fzT1WXjFq5KZamC-UiZbB1vJvxEGZymaGOjGrPGg" 
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({title, description, tag}),
    });

    let newNotes = JSON.parse(JSON.stringify(notes));

    const json = await response.json();
    console.log(json);
    
    for (let index = 0; index < notes.length; index++) 
    {
      const element = await notes[index];
      if(element.id === id)
      {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
      break;  
      }   
    }
    setNotes(newNotes);
  }
  
  
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNode, editNode, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;


