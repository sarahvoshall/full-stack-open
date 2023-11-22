import { useState } from "react";

import "./App.css"

const Header = ({ children }) => {
  return <h1>{children}</h1>;
};

const Button = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};

const Log = ({ goodCount, neutralCount, badCount }) => {
  const total = goodCount + neutralCount + badCount;
  const average = (goodCount - badCount) / total;

  if (!total) {
    return <p>No feedback given</p>;
  }
  return (
    <table>
      <tbody>
        <tr>
          <td>good</td>
          <td>{goodCount}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{neutralCount}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{badCount}</td>
        </tr>
        <tr>
          <td>total</td>
          <td>{total}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{average}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{(goodCount / total) * 100}%</td>
        </tr>
      </tbody>
    </table>
  );
};

const Statistics = ({ goodCount, neutralCount, badCount }) => {
  return (
    <>
      <Header>statistics</Header>
      <Log
        goodCount={goodCount}
        neutralCount={neutralCount}
        badCount={badCount}
      />
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood((prev) => prev + 1);
  };

  const handleNeutralClick = () => {
    setNeutral((prev) => prev + 1);
  };

  const handleBadClick = () => {
    setBad((prev) => prev + 1);
  };

  return (
    <main>
      <Header>give feedback</Header>
      <Button onClick={handleGoodClick}>good</Button>
      <Button onClick={handleNeutralClick}>neutral</Button>
      <Button onClick={handleBadClick}>bad</Button>
      <Statistics goodCount={good} neutralCount={neutral} badCount={bad} />
    </main>
  );
};

export default App;
