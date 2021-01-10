import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useInputState from "../hooks/useInputState";
import HashTagSelector from "./HashTagSelector";

function NewGoalForm({ setGoals, globalHashTags }) {
  const [name, setName, resetName] = useInputState("");
  const [desc, setDesc, resetDesc] = useInputState("");
  const [hashTags, setHashTags] = useState([]);
  // time added assumed new Date() for now

  const resetForm = () => {
    resetName();
    resetDesc();
    setHashTags([]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newGoal = {
      _id: uuidv4(),
      name,
      description: desc,
      timeAdded: new Date(),
      hashTags,
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
      <HashTagSelector
        hashTags={hashTags}
        setHashTags={setHashTags}
        globalHashTags={globalHashTags}
      />
      <button type="submit">Create new goal</button>
    </form>
  );
}

export default NewGoalForm;

// To Do - update Form with proper Goal structure
// Validate Form
