const NoteList = (props) => {
	const { setNoteTitle, notes, setNotes, setEditMode, setEditableNote } =
		props;

	const removeHandler = (noteId) => {
		// noteId = 2
		// notes.splice()
		const updatedNotes = notes.filter((note) => note.id !== noteId);
		// 								()		=> 1 !== 2
		//								()      => 2 !== 2

		setNotes(updatedNotes);
		// notes = updatedNotes
	};

	const editHandler = (note) => {
		setEditMode(true);
		//editMode = true
		setEditableNote(note);
		// editableNote = note
		setNoteTitle(note.title);
	};
	return (
		<div className="notes">
			<h2>All Notes</h2>
			<ul className="note-list">
				{notes.map((note) => (
					<li key={note.id}>
						<span>{note.title}</span>
						<button onClick={() => editHandler(note)}>Edit</button>
						<button onClick={() => removeHandler(note.id)}>
							Remove
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default NoteList;
