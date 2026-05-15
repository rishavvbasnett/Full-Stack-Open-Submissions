import { useState } from "react";
import Note from "./components/Note";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true)

  const handleSubmit = (event) => {
    event.preventDefault();
    addNote()
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const addNote = () => {
    const note = {
      content: newNote,
      id: notes.length + 1,
      important: Math.random() < 0.5
    }
    setNotes((prev) => [...prev, note]);
    setNewNote('')
  };

  const notesToShow = showAll 
  ? notes
  : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick = {() => setShowAll(!showAll)} >
          Show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default App;
