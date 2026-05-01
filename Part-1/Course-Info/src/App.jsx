const App = () => {
  const course = "Half Stack Application Development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        part2={part2}
        part3={part3}
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
      <Total
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <>
      <Part part1={props.part1} exercises1={props.exercises1} />
      <Part part2={props.part2} exercises2={props.exercises2} />
      <Part part3={props.part3} exercises3={props.exercises3} />
    </>
  );
};

const Total = (props) => {
  return (
    <p>
      Total Number of exercises{" "}
      {props.exercises1 + props.exercises2 + props.exercises3}
    </p>
  );
};

const Part = (props) => {
  let partName;
  let exerciseCount;

  if (Object.hasOwn(props, "exercises1")) {
    console.log("Entered Part 1");
    partName = props.part1;
    exerciseCount = props.exercises1;
  } else if (Object.hasOwn(props, "exercises2")) {
    console.log("Entered Part 2");
    partName = props.part2;
    exerciseCount = props.exercises2;
  } else if (Object.hasOwn(props, "exercises3")) {
    console.log("Entered Part 3");
    partName = props.part3;
    exerciseCount = props.exercises3;
  }
  return (
    <p>
      {partName} {exerciseCount} exercises
    </p>
  );
};

export default App;
