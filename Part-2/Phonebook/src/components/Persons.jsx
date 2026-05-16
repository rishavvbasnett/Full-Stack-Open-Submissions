const Persons = ({ persons, showAll, personsToShow }) => {
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

export default Persons