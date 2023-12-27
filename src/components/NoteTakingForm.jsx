const NoteTakingForm = (props) => {
	console.log(props);
	const {
		noteTitle,
		setNoteTitle,
		editMode,
		setEditMode,
		notes,
		setNotes,
		editableNote,
		setEditableNote,
	} = props;

	// const {
	// 	formProps: {
	// 		noteTitle,
	// 		setNoteTitle,
	// 		notes,
	// 		setNotes,
	// 		editMode,
	// 		setEditMode,
	// 		editableNote,
	// 		setEditableNote,
	// 	},
	// } = props;

	const submitHandler = (event) => {
		event.preventDefault();
		editMode ? updateHandler() : createHandler();

		// notes.push(note);
	};

	const createHandler = () => {
		if (!noteTitle) {
			return alert(`Please provide a valid note title`);
		}
		console.log(noteTitle);

		const note = {
			id: Date.now() + "",
			title: noteTitle,
		};

		setNotes([...notes, note]);
		setNoteTitle("");
	};

	const updateHandler = () => {
		const updatedNotes = notes.map((note) => {
			if (note.id === editableNote.id) {
				return { ...note, title: noteTitle };
				// note.title = noteTitle
			}

			return note;
		});

		console.log(updatedNotes);
		setNotes(updatedNotes);
		setEditMode(false);
		setEditableNote(null);
		setNoteTitle("");
	};
	return (
		<form onSubmit={submitHandler}>
			<input
				type="text"
				value={noteTitle}
				onChange={(event) => setNoteTitle(event.target.value)}
			/>
			<button type="submit">
				{editMode ? "Update Note" : "Add Note"}
			</button>
		</form>
	);
};

export default NoteTakingForm;
