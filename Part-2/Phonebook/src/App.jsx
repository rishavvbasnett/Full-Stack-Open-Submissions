import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import { fetchPersons } from "./services/notes.js";
import { postPersons } from "./services/notes.js";
import { deletePerson } from "./services/notes.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [personsToShow, setPersonsToShow] = useState([]);
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    fetchPersons().then((data) => setPersons(data));
  }, []);

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
      postPersons(newPerson).then((postedPerson) =>
        setPersons([...persons, postedPerson]),
      );
      setNewName("");
      setNewNumber("");
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

  const handleDelete = (people) => {
    const result = window.confirm(`Delete ${people.name}?`);
    if (result) {
      deletePerson(people.id);
      const newPersons = [...persons].filter(
        (person) => person.id !== people.id,
      );
      setPersons(newPersons);
    } else {
      return;
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilter={handleFilter} />
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        showAll={showAll}
        personsToShow={personsToShow}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
