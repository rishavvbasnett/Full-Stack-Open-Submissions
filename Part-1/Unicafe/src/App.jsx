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
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={getTotal()}
        average={getAverage()}
        positive={getPositive()}
      />
    </div>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  if (total < 1) {
    return <h3>No feedback given yet</h3>;
  } else {
    return (
      <div>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="Total" value={total} />
            <StatisticLine text="Average" value={average} />
            <StatisticLine text="Positive" value={positive + "%"} />
          </tbody>
        </table>
      </div>
    );
  }
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};
export default App;
