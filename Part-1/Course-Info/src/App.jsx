const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application Development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

const Course = (props) => {
  const course = props.course;
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Sum parts = {course.parts} />
    </>
  );
};

const Header = (props) => {
  const title = props.course.name;
  return <h3>{title}</h3>;
};

const Content = (props) => {
  const parts = props.course.parts;
  return parts.map((part) => {
    return (
      <>
    <Part part={part} />
    </>
  );
  });
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name}: {part.exercises}
    </p>
  );
};

const Sum = ( {parts} ) => {
  let total = 0;
  parts.forEach( part => {
    total += part.exercises;
  })
  return <p>Total exercises: {total}</p>
}

export default App;
