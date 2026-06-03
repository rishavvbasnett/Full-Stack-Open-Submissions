import { useState, useEffect, useRef } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import { fetchPersons } from "./services/api.js";
import { postPersons } from "./services/api.js";
import { deletePerson } from "./services/api.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [personsToShow, setPersonsToShow] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const nameRef = useRef(null);
  const numberRef = useRef(null);

  useEffect(() => {
    fetchPersons().then((data) => setPersons(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const number = numberRef.current.value;
    /* Logic to check if the Entered name is already in the state */
    if (persons.some((person) => person.name === name)) {
      alert(`${name} is already on the Phonebook`);
    } else {
      const newPerson = {
        name: name,
        number: number,
      };
      postPersons(newPerson).then((postedPerson) =>
        setPersons([...persons, postedPerson]),
      );
      nameRef.current.value = "";
      numberRef.current.value = "";
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
        handleSubmit={handleSubmit}
        nameRef={nameRef}
        numberRef={numberRef}
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
