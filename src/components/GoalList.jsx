import React, { useState, useEffect } from "react";
import Goal from "./Goal";
import useInputState from "../hooks/useInputState";

import SortIcon from "@material-ui/icons/Sort";
import MenuList from "@material-ui/core/MenuList";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";

import SelectTagFilters from "./SelectTagFilters";

function GoalList({ goals, setGoals, globalHashTags }) {
  const [searchText, setSearchText, resetSearchText] = useInputState("");
  const [selectedHastagIds, setSelectedHashTagIds] = useState({});
  const [filteredGoals, setFilteredGoals] = useState(goals);
  const [sortedGoals, setSortedGoals] = useState(filteredGoals);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleSortMenu = () => {};

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
    return sortedGoals.map((goal) => (
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
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <SortIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              setSortedGoals((prevGoals) => {});
            }}
          >
            <ListItemIcon>
              <ArrowDownwardIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Time spent</Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ArrowUpwardIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Time spent</Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ArrowDownwardIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit" noWrap>
              Created
            </Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ArrowUpwardIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Created</Typography>
          </MenuItem>
        </MenuList>
      </Menu>
      {renderGoals()}
    </div>
  );
}

export default GoalList;

//TODO add reset filters button?
