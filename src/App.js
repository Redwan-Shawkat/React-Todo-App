import { useState } from "react";
import "./App.css";
import NoteTakingForm from "./components/NoteTakingForm";
import NoteList from "./components/NoteList";

const App = () => {
	const [noteTitle, setNoteTitle] = useState("");
	const [notes, setNotes] = useState([]);
	const [editMode, setEditMode] = useState(false);
	const [editableNote, setEditableNote] = useState(null);

	// Derived State
	const formProps = {
		noteTitle,
		setNoteTitle,
		editMode,
		setEditMode,
		notes,
		setNotes,
		editableNote,
		setEditableNote,
	};

	const noteListProps = {
		notes,
		setNotes,
		setNoteTitle,
		setEditMode,
		setEditableNote,
	};
	
	return (
		<div className="App">
			<NoteTakingForm {...formProps} />
			<NoteList {...noteListProps} />
		</div>
	);
};

export default App;
