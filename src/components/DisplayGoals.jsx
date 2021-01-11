import React from "react";
import Chip from "@material-ui/core/Chip";

function DisplayGoals({ goals }) {
  const renderHashTags = (hashTags) => {
    console.log(hashTags);
    return hashTags.map((hashTag) => (
      <Chip key={hashTag} label={hashTag} clickable color="secondary" />
    ));
  };

  const renderGoals = () => {
    return goals.map((goal) => (
      <div key={goal._id}>
        <h4>{goal.name}</h4>
        <p>{goal.description}</p>
        <p>{new Date(goal.timeAdded).toString()}</p>
        {goal?.hashTags &&
          goal?.hashTags?.length !== 0 &&
          renderHashTags(goal.hashTags)}
      </div>
    ));
  };

  return <div>{renderGoals()}</div>;
}

export default DisplayGoals;
