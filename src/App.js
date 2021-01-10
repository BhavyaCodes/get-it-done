import { v4 as uuidv4 } from "uuid";
import useLocalStorageState from "./hooks/useLocalStorageState";

import DisplayGoals from "./components/DisplayGoals";
import NewGoalForm from "./components/NewGoalForm";

import "./App.css";

// testing

function App() {
  const [globalHashTags, setGlobalHashTags] = useLocalStorageState("hashtags", [
    "Health",
    "love",
    "personal",
    "family",
    "academic",
  ]);
  const [goals, setGoals] = useLocalStorageState("goals", [
    {
      _id: uuidv4(),
      name: "goal 1",
      description:
        "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print",
      timeAdded: new Date(),
    },
    {
      _id: uuidv4(),
      name: "goal 2",
      description:
        "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print",
      timeAdded: new Date(),
    },
  ]);
  return (
    <div className="App">
      <header className="App-header">
        <NewGoalForm setGoals={setGoals} globalHashTags={globalHashTags} />
        <DisplayGoals goals={goals} setGoals={setGoals} />
      </header>
    </div>
  );
}

export default App;
