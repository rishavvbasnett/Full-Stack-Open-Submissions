import { useState, useEffect, useRef } from "react";
import Note from "./components/Note";
import api from "./services/api.js";

const App = () => {
  const [notes, setNotes] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    api.fetchNotes().then((notes) => {
      setNotes(notes);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const submittedNote = {
      content: inputRef.current.value,
      important: Math.random() < 0.5,
    };
    api
      .postNote(submittedNote)
      .then((savedNote) => setNotes((prev) => [...prev, savedNote]));
    inputRef.current.value = "";
  };

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note note={note} />
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default App;
