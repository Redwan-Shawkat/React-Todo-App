import React from 'react';
import { useState } from 'react';
import "./App.css"

const App = () => {

  const [noteTitle, setNoteTitle] = useState("")
  const [notes, setNotes] = useState([]);
  const [editMode, setEditMode] = useState (false);
  const [editableNote, setEditableNote] = useState(null);
  // In editableMotes, যেহেতু object ঢুকবে,so empty obj {} দেয়ার কথা।
  //  বাট তা না করে , আমরা দিবো null. কারন এটার typeof: object
  // না হলে, যখন check করবো obj আছে নাকি নেই - তখন প্রবলেম হবে


  const submitHandler= (event) => {
    event.preventDefault();
    
    editMode ? updateHandler() : createHandler();
  }

  const createHandler = () => {
    // To prevent empty submit
    if (!noteTitle){
      return alert (`Please provide a valid note`)
    }
    //console.log(noteTitle)

    // When one submits, it will create a note object
    const note = {
      id: Date.now() + ``, 
      // -----> Previous Line  Used Concat to Make It String 
      title: noteTitle
      // -----> user input is being caught by noteTitle 
    }

    // -----> To update information
    setNotes([...notes, note]);
    //Array দিবো। কারণ initial state এ - array is called
    //...notes : spread করলাম। যেহেতু তা না করলে , আগের value React ফেলে দিবে 
    // then "note". Newly created one
    // // -----> We Could do concat too. 
    // setNotes(notes.concat(note))
    //Concat method returns new array. It never touches the past array

    // notes.push: will not work

    // After submitting and creating a brand new note title,
    // the input field needs to be clear
    setNoteTitle("");
    //After submit, it will return an empty string
  }
  
  const removeHandler = (noteId) => {

    // notes.slice not possible . Because it causes damage to the existing arrays as well.
    // We need to call a new array
    
    const updatedNotes = notes.filter((note) => note.id !== noteId)
    // filter returns a new array
    // filter (loop) continues. The providing condition is true?  include it to the new array
    //If false, that will not include in new array. 

    setNotes(updatedNotes)
  }

  const editHandler = (note) => {
    setEditMode(true)
    setEditableNote (note) 

    //Note টা input field এ নিতে
    setNoteTitle(note.title)
  }

  const updateHandler = () => {
      const updatedNotes = notes.map((note) => {
        if (note.id === editableNote.id){
          // note.title = noteTitle (Many do this but its not right. return new object)
          return {...note, title: noteTitle};

          //updated note will go in updateNotes array
        }

        // If condition false, return existing notes
        return note;
      })

      console.log(updatedNotes);
      setNotes(updatedNotes)

      //Update ends. go to add note now
      setEditMode(false)
      setEditableNote(null)
      setNoteTitle("")

  }
  return (
    <div className="App">


      {/* // -----> onSubmit click Something new will happen  */}
      <form onSubmit={submitHandler}>

        {/* // -----> value is being used for attaching state to input text field   */}
        {/* // -----> change event onChange is being used for cable to change its value using setNoteTitle   */}
        
        <input type='text' 
        value={noteTitle} 
        // onChange={(event) => {
        //   setNoteTitle(event.target.value)
        //// -----> onchange in short   
        onChange={(event => setNoteTitle(event.target.value))}
        />

        {/* 
          During adding note: add note
          During updating node: update note
        */} 
        <button type='submit'>
          {editMode ? "Update Note" : "Add Note"}</button>

      </form>
      
      <div className='notes'>
            <h2> All Notes </h2>
            <ul className="note-list">
              {notes.map((note) => (
                <li key = {note.id}>
                  <span> {note.title} </span>
                  <button onClick={() => editHandler(note)}> Edit </button>
                  <button onClick={() => removeHandler(note.id)}> Remove </button>
                  {/* onClick  জোড়া লাগাতে এরুপ একটা Arrow function নিতে হিবে এবং
                  তাতে আমার উক্ত function এর referance দিতে হবে। */}
                </li>
              ))}
            </ul>
      </div>

    </div>
  )
}

export default App;