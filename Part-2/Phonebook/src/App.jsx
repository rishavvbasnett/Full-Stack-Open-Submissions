import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{}]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Logic to check if the Entered name is already in the state */
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already on the Phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      setPersons((prev) => [...prev, newPerson]);
      setNewName("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Name:
          <input
            required
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          Number:{" "}
          <input
            required
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
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
    return persons.map((person) => (
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    ));
  }
};

export default App;
