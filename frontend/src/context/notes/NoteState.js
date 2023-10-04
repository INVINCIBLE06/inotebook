import react from "react";
import NoteContext from "./noteContext";

const NoteState = (props) =>
{
    const state = {
        "name" : "Saurabh",
        "class" : "5B"
    }
    return (
        <NoteContext.Provider value = {state}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;