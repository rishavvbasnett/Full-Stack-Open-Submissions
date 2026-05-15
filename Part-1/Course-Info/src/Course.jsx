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
  return <p style={{fontWeight: "bold"}}>Total exercises: {total}</p>
}

export default Course