import React from "react";
import Goal from "./Goal";

function GoalList({ goals, setGoals }) {
  const renderGoals = () => {
    return goals.map((goal) => (
      <Goal goal={goal} setGoals={setGoals} key={goal._id} />
    ));
  };

  return <div>{renderGoals()}</div>;
}

export default GoalList;
