import "./App.css";
import DisplayGoals from "./components/DisplayGoals";
import NewGoalForm from "./components/NewGoalForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NewGoalForm />
        <DisplayGoals />
      </header>
    </div>
  );
}

export default App;
