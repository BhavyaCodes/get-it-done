import useLocalStorageState from "./hooks/useLocalStorageState";

import DisplayGoals from "./components/DisplayGoals";
import NewGoalForm from "./components/NewGoalForm";

import "./App.css";

function App() {
  const [goals, setGoals] = useLocalStorageState("goals", [
    {
      name: "goal 1",
      description:
        "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print",
      timeAdded: new Date(),
    },
    {
      name: "goal 2",
      description:
        "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print",
      timeAdded: new Date(),
    },
  ]);
  return (
    <div className="App">
      <header className="App-header">
        <NewGoalForm setGoals={setGoals} />
        <DisplayGoals goals={goals} setGoals={setGoals} />
      </header>
    </div>
  );
}

export default App;
