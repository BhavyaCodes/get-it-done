import { v4 as uuidv4 } from "uuid";
import useLocalStorageState from "./hooks/useLocalStorageState";

import GoalList from "./components/GoalList";
import NewGoalForm from "./components/NewGoalForm";

import "./App.css";

function App() {
  const [globalHashTags, setGlobalHashTags] = useLocalStorageState("hashtags", [
    { _id: "0", tag: "health", color: "green" },
    { _id: "1", tag: "love", color: "red" },
    { _id: "2", tag: "personal", color: "teal" },
    { _id: "3", tag: "family", color: "lime" },
    { _id: "4", tag: "academic", color: "blue" },
  ]);
  const [goals, setGoals] = useLocalStorageState("goals", [
    {
      _id: uuidv4(),
      name: "goal 1",
      description:
        "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print",
      timeAdded: new Date(),
      duration: 1000,
      isActive: false,
      hashTags: {
        2: { _id: "2", tag: "personal", color: "teal" },
        4: { _id: "4", tag: "academic", color: "blue" },
      },
    },
    {
      _id: uuidv4(),
      name: "goal 2",
      description:
        "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print",
      timeAdded: new Date(),
      duration: 2000,
      isActive: false,
      hashTags: {
        0: { _id: "0", tag: "health", color: "green" },
        1: { _id: "1", tag: "love", color: "red" },
      },
    },
  ]);
  return (
    <div className="App">
      <header className="App-header">
        <NewGoalForm setGoals={setGoals} globalHashTags={globalHashTags} />
        <GoalList
          goals={goals}
          setGoals={setGoals}
          globalHashTags={globalHashTags}
        />
      </header>
    </div>
  );
}

export default App;
