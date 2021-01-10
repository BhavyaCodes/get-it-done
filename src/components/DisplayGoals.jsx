import React from "react";

function DisplayGoals({ goals }) {
  const renderGoals = () => {
    return goals.map((goal) => (
      <div key={goal._id}>
        <h4>{goal.name}</h4>
        <p>{goal.description}</p>
        <p>{new Date(goal.timeAdded).toString()}</p>
      </div>
    ));
  };

  return <div>{renderGoals()}</div>;
}

export default DisplayGoals;
