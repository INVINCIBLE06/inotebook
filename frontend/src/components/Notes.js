import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNode } = context;

  useEffect(() => {
    getNotes();
  }, []); // Removed the eslint-disable-next-line, it's not needed.

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  const updateNote = (currentNote) => {
    ref.current.click();
    editNode({id: currentNote._id, etitle:currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
  };

  const handleClick = (e) => {
    console.log('Update the node...', note);
    editNode(note.id, note.etitle, note.edescription, note.etag)
    e.preventDefault();
    // refClose.current.click()
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote />
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none" // Changed 'class' to 'className'
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={onChange} />
                </div>  
              </form>
              <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button onClick={handleClick} type="button" className="btn btn-primary" >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes?.map((note) => {
          return <Noteitem key={note.id} updateNote={updateNote} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
