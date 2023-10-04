// import { useState } from "react";
// import NoteContext from "./noteContext";

// const NoteState = (props) =>
// {
//     const s1 = {
//         "name" : "Saurabh Pande",
//         "class" : "5B"
//     }

//     const [state, setState] = useState(s1);
//     const update = () =>
//     {
//         setTimeout = (() =>{
//             setState({
//                 "name" : "Xi Jinping",
//                 "class" : "Communist Party"
//             })
//         }, 1000);
//     }
//     return (
//         <NoteContext.Provider value = {{state, update}}>
//             {props.children}
//         </NoteContext.Provider>
//     )
// };

// export default NoteState;

import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const s1 = [
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
    console.log(`Adding a new node`);
    // TODO API CALL
    let note = {
      "id": 5,
      "title": "Rishi Sunak",
      "description": "First Hindu PM",
    }
    setNotes(notes.concat(note));
  }

  // Delete a Note
  const deleteNode = () =>
  {
  }


  // Edit a Note

  const editNode = () =>
  {

  }


  const [notes, setNotes] = useState(s1);
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNode, editNode }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
