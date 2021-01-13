import React, { useState, useEffect } from "react";
import Goal from "./Goal";
import useInputState from "../hooks/useInputState";

function GoalList({ goals, setGoals, globalHashTags }) {
  const [searchText, setSearchText, resetSearchText] = useInputState("");
  const [selectedHastagIds, setSelectedHashTagIds] = useState([]);
  const [filteredByTextGoals, setFilteredByTextGoals] = useState(goals);

  console.log(filteredByTextGoals);

  useEffect(() => {
    console.log("useEffect");
    if (!searchText) {
      return setFilteredByTextGoals(goals);
    }
  }, [searchText, goals]);

  const renderGoals = () => {
    return goals.map((goal) => (
      <Goal
        goal={goal}
        setGoals={setGoals}
        globalHashTags={globalHashTags}
        key={goal._id}
      />
    ));
  };

  return (
    <div>
      <label>Filter text</label>
      <input value={searchText} onChange={setSearchText} />
      {renderGoals()}
    </div>
  );
}

export default GoalList;
