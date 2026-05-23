import Delete from "./Delete";

const Persons = ({ persons, showAll, personsToShow, handleDelete }) => {
  if (persons.length < 1) {
    return;
  } else {
    if (showAll) {
      return persons.map((person) => (
        <>
          <p key={person.name}>
            {person.name} {person.number}
          </p>
          <Delete handleDelete={() => handleDelete(person)} />
        </>
      ));
    } else {
      return personsToShow.map((person) => (
        <>
          <p key={person.name}>
            {person.name} {person.number}
          </p>
          <Delete handleDelete={() => handleDelete(person)} />
        </>
      ));
    }
  }
};

export default Persons;
