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
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

import SelectTagFilters from "./SelectTagFilters";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    paddingTop: theme.spacing(2),
  },
  searchFilterDiv: {
    display: "flex",
    justifyContent: "space-between",
  },
  input: {
    width: "90%",
  },
  searchBarRoot: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    width: "95%",
  },
  searchIconContainer: {
    display: "flex",
    alignItems: "center",
  },
  checkBoxContainer: {
    padding: theme.spacing(2),
  },
}));

function GoalList({ goals, setGoals, globalHashTags }) {
  const classes = useStyles();
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

  useEffect(() => {
    setSortedGoals(filteredGoals);
  }, [filteredGoals]);

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
    <div className={classes.root}>
      <div className={classes.searchFilterDiv}>
        <Paper elevation={2} component="div" className={classes.searchBarRoot}>
          <InputBase
            className={classes.input}
            placeholder="Search Goals"
            inputProps={{ "aria-label": "search Goals" }}
            value={searchText}
            onChange={setSearchText}
          />
          <div className={classes.searchIconContainer}>
            <SearchIcon />
          </div>
        </Paper>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <SortIcon />
        </IconButton>
      </div>
      <div className={classes.checkBoxContainer}>
        <Typography style={{ fontSize: "1.5rem" }}>
          Select Hashtags to filter by
        </Typography>
        <SelectTagFilters
          selectedHastagIds={selectedHastagIds}
          setSelectedHashTagIds={setSelectedHashTagIds}
          globalHashTags={globalHashTags}
        />
      </div>

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
              setSortedGoals((prevGoals) => {
                return prevGoals.sort(function (a, b) {
                  const duration1 = a.isActive
                    ? a.duration +
                      (new Date().getTime() -
                        new Date(a.latestStartTimeStamp).getTime()) /
                        1000
                    : a.duration;

                  const duration2 = b.isActive
                    ? b.duration +
                      (new Date().getTime() -
                        new Date(b.latestStartTimeStamp).getTime()) /
                        1000
                    : b.duration;
                  return duration1 - duration2;
                });
              });
              handleClose();
            }}
          >
            <ListItemIcon>
              <ArrowDownwardIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Time spent</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSortedGoals((prevGoals) => {
                return prevGoals.sort(function (a, b) {
                  const duration1 = a.isActive
                    ? a.duration +
                      (new Date().getTime() -
                        new Date(a.latestStartTimeStamp).getTime()) /
                        1000
                    : a.duration;

                  const duration2 = b.isActive
                    ? b.duration +
                      (new Date().getTime() -
                        new Date(b.latestStartTimeStamp).getTime()) /
                        1000
                    : b.duration;
                  return duration2 - duration1;
                });
              });
              handleClose();
            }}
          >
            <ListItemIcon>
              <ArrowUpwardIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Time spent</Typography>
          </MenuItem>
        </MenuList>
      </Menu>
      {renderGoals()}
    </div>
  );
}

export default GoalList;

//TODO add reset filters button?
