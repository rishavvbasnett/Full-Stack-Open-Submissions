import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood((prev) => prev + 1);
  const handleNeutral = () => setNeutral((prev) => prev + 1);
  const handleBad = () => setBad((prev) => prev + 1);

  const getTotal = () => {
    const total = good + neutral + bad;
    return total;
  };

  const getAverage = () => {
    const total = getTotal();
    if (total < 1) {
      return 0;
    } else {
      return (good * 1 + neutral * 0 + bad * -1) / total;
    }
  };

  const getPositive = () => {
    const total = getTotal();
    if (total < 1) {
      return 0;
    } else {
      return (good / total) * 100;
    }
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={handleGood} text="Good" />
      <Button onClick={handleNeutral} text="Neutral" />
      <Button onClick={handleBad} text="Bad" />
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <Statistics
        total={getTotal()}
        average={getAverage()}
        positive={getPositive()}
      />
    </div>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ total, average, positive }) => {
  if (total < 1) {
    return <h3>No feedback given yet</h3>;
  } else {
    return (
      <div>
        <h2>Statistics</h2>
        <div>
          <p>Total: {total}</p>
          <p>Average: {average}</p>
          <p>Positive: {positive}%</p>
        </div>
      </div>
    );
  }
};
export default App;
