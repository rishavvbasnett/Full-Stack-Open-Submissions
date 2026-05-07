import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  const handleAnecdote = () => {
    const anecdote = Math.floor(Math.random() * 8);
    setSelected(anecdote);
  };

  const handleVote = () => {
    setVotes((prev) => {
      let newVotes = { ...prev };
      newVotes[selected] = newVotes[selected] + 1;
      return newVotes;
    });
  };

  return (
    <div>
      <Anecdotes anecdotes={anecdotes} selected={selected} />
      <Votes selected={selected} votes={votes} />
      <Button onClick={handleVote} text="Vote" />
      <Button onClick={handleAnecdote} text="Next Quote" />
      <HighestVotedQuote votes={votes} anecdotes={anecdotes} />
    </div>
  );
};

const Anecdotes = ({ anecdotes, selected }) => {
  if (selected === null) {
    return;
  } else {
    return <h3>{anecdotes[selected]}</h3>;
  }
};

const Votes = ({ selected, votes }) => {
  return <p>Votes: {votes[selected]}</p>;
};

const HighestVotedQuote = ({ votes, anecdotes }) => {
  console.log(votes);
  let highestVotes = 0;
  let highestVoted;
  for (const [key, value] of Object.entries(votes)) {
    if (value > highestVotes) {
      highestVotes = value;
      highestVoted = anecdotes[key];
    }
  }

  if (highestVotes === 0) {
    return;
  } else {
    return (
      <>
        <h3>Higest Voted Quote</h3>
        <h4>{highestVoted}</h4>
      </>
    );
  }
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

export default App;
