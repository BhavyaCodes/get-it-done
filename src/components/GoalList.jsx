import React, { useState, useEffect } from "react";
import Goal from "./Goal";
import useInputState from "../hooks/useInputState";

import SelectTagFilters from "./SelectTagFilters";

function GoalList({ goals, setGoals, globalHashTags }) {
  const [searchText, setSearchText, resetSearchText] = useInputState("");
  const [selectedHastagIds, setSelectedHashTagIds] = useState({});
  const [filteredGoals, setFilteredGoals] = useState(goals);

  useEffect(() => {
    const textFilter = !searchText
      ? goals
      : goals.filter((goal) => {
          if (
            goal.name
              .trim()
              .toLowerCase()
              .includes(searchText.trim().toLowerCase()) ||
            goal.description
              .trim()
              .toLowerCase()
              .includes(searchText.trim().toLowerCase())
          ) {
            return true;
          }
          return false;
        });

    const tagFilter =
      Object.keys(selectedHastagIds).length === 0
        ? textFilter
        : textFilter.filter((goal) => {
            for (let key in goal.hashTags) {
              if (selectedHastagIds[key]) {
                return true;
              }
            }
            return false;
          });

    setFilteredGoals(tagFilter);
  }, [searchText, goals, selectedHastagIds]);

  const renderGoals = () => {
    return filteredGoals.map((goal) => (
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
      <label>Search</label>
      <SelectTagFilters
        selectedHastagIds={selectedHastagIds}
        setSelectedHashTagIds={setSelectedHashTagIds}
        globalHashTags={globalHashTags}
      />
      <input value={searchText} onChange={setSearchText} />
      {renderGoals()}
    </div>
  );
}

export default GoalList;

//TODO add reset filters button?
