import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [personsToShow, setPersonsToShow] = useState([]);
  const [newFilter, setNewFilter] = useState("");

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

  const handleFilter = (e) => {
    const filterQuery = e.target.value;
    setNewFilter(filterQuery);
    if (filterQuery === "") {
      setShowAll(true);
      return;
    } else {
      setShowAll(false);
      /* Logic to filtering numbers while typing */
      const newPersonToShow = persons.filter(
        (person) =>
          person.name.toLowerCase().startsWith(filterQuery.toLowerCase()) ||
          person.number.toLowerCase().startsWith(filterQuery.toLowerCase()),
      );
      setPersonsToShow(newPersonToShow);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter: <input value={newFilter} onChange={(e) => handleFilter(e)} />
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Add new number</h3>
        <div>
          Name:{" "}
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
      <People
        persons={persons}
        showAll={showAll}
        personsToShow={personsToShow}
      />
    </div>
  );
};

const People = ({ persons, showAll, personsToShow }) => {
  if (persons.length < 1) {
    return;
  } else {
    if (showAll) {
      return persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ));
    } else {
      return personsToShow.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ));
    }
  }
};

export default App;
