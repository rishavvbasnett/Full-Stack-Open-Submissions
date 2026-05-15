import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName
    }
    setPersons( prev => [...prev, newPerson])
    setNewName('')
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Name: 
          <input value={newName}
          onChange={(e) => setNewName(e.target.value)}/>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <People persons={persons} />
    </div>
  );
};

const People = ({ persons }) => {
  if (persons.length < 1) {
    return;
  } else {
    return persons.map((person) => <p key={person.name}>{person.name}</p>);
  }
};

export default App;
