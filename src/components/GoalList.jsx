import React from "react";
import Goal from "./Goal";

function DisplayGoals({ goals, setGoals }) {
  const renderGoals = () => {
    return goals.map((goal) => <Goal goal={goal} setGoals={setGoals} />);
  };

  return <div>{renderGoals()}</div>;
}

export default DisplayGoals;
