import { v4 as uuidv4 } from "uuid";
import useInputState from "../hooks/useInputState";

function NewGoalForm({ setGoals }) {
  const [name, setName, resetName] = useInputState("");
  const [desc, setDesc, resetDesc] = useInputState("");
  // time added assumed new Date() for now

  const resetForm = () => {
    resetName();
    resetDesc();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newGoal = {
      _id: uuidv4(),
      name,
      description: desc,
      timeAdded: new Date(),
    };
    setGoals((prevGoals) => {
      return [...prevGoals, newGoal];
    });
    resetForm();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>Name</label>
      <input value={name} onChange={setName} />
      <br />
      <label>Description</label>
      <input value={desc} onChange={setDesc} />
      <br />
      <button type="submit">Create new goal</button>
    </form>
  );
}

export default NewGoalForm;

// To Do - update Form with proper Goal structure
// Validate Form
// add uuid to goal
