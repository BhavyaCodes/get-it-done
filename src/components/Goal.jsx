import React, { useEffect, useState } from "react";

import useInputState from "../hooks/useInputState";
import HashTagSelector from "./HashTagSelector";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import { withStyles } from "@material-ui/core/styles";
import {
  red,
  pink,
  green,
  purple,
  blue,
  teal,
  lime,
  yellow,
  grey,
} from "@material-ui/core/colors";

const colors = {
  red,
  pink,
  green,
  purple,
  blue,
  teal,
  lime,
  yellow,
  grey,
};

function EditGoal({ goal, setGoals, globalHashTags, setEditing }) {
  const [name, setName, resetName] = useInputState(goal.name);
  const [desc, setDesc, resetDesc] = useInputState(goal.description);
  const [hashTags, setHashTags] = useState(goal.hashTags);

  const handleUpdateGoal = (e) => {
    e.preventDefault();
    console.log("handleUpdateGoal");
    setGoals((prevGoals) => {
      return prevGoals.map((prevGoal) => {
        if (goal._id !== prevGoal._id) {
          return prevGoal;
        }
        return { ...prevGoal, name, description: desc, hashTags };
      });
    });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  return (
    <form onSubmit={handleUpdateGoal}>
      <label>Name</label>
      <input value={name} required onChange={setName} />
      <br />
      <label>Description</label>
      <input value={desc} onChange={setDesc} />
      <br />
      <HashTagSelector
        hashTags={hashTags}
        setHashTags={setHashTags}
        globalHashTags={globalHashTags}
      />
      <button type="submit">save</button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}

function Goal({ goal, setGoals, globalHashTags }) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [editing, setEditing] = useState(false);
  const [displaySeconds, setDisplaySeconds] = useState(
    goal.isActive
      ? goal.duration +
          (new Date().getTime() -
            new Date(goal.latestStartTimeStamp).getTime()) /
            1000
      : goal.duration
  );
  useEffect(() => {
    setDisplaySeconds(goal.duration);
  }, [goal.duration]);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (goal.isActive) {
        setDisplaySeconds((prevDisplaySeconds) => prevDisplaySeconds + 1);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const handleStartPause = () => {
    setGoals((prevGoals) => {
      return prevGoals.map((prevGoal) => {
        if (goal._id !== prevGoal._id) {
          return prevGoal;
        }

        return {
          ...prevGoal,
          latestStartTimeStamp: !prevGoal.isActive ? new Date() : null,
          ...(prevGoal.isActive && {
            duration:
              prevGoal.duration +
              (new Date().getTime() -
                new Date(prevGoal.latestStartTimeStamp).getTime()) /
                1000,
          }),
          isActive: !prevGoal.isActive,
        };
      });
    });
  };

  const handleClickOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const renderHashTags = (hashTags) => {
    const chips = [];
    for (let key in hashTags) {
      const ColorButton = withStyles((theme) => ({
        root: {
          color: theme.palette.getContrastText(
            colors[hashTags[key].color][500]
          ),
          backgroundColor: colors[hashTags[key].color][500],
          "&:hover": {
            backgroundColor: colors[hashTags[key].color][700],
          },
        },
      }))(Button);

      chips.push(
        <ColorButton size="small" key={hashTags[key]._id}>
          {hashTags[key].tag}
        </ColorButton>
      );
    }
    return chips;
  };

  const handleDeleteGoal = (goalId) => {
    setGoals((prevGoals) => {
      return prevGoals.filter((prevGoal) => prevGoal._id !== goalId);
    });
    handleClose();
  };

  if (editing) {
    return (
      <EditGoal
        goal={goal}
        setGoals={setGoals}
        globalHashTags={globalHashTags}
        setEditing={setEditing}
      />
    );
  }

  return (
    <div>
      <h4>{goal.name}</h4>
      <p>{goal.description}</p>
      <p>{new Date(goal.timeAdded).toString()}</p>
      {goal?.hashTags &&
        goal?.hashTags?.length !== 0 &&
        renderHashTags(goal.hashTags)}
      <p> displaySeconds variable - {displaySeconds}</p>
      {/* <p>Duration variable - {goal.duration}</p> */}
      <Button variant="contained" color="primary" onClick={handleStartPause}>
        {goal.isActive ? "pause" : "start"}
      </Button>
      <button type="button" onClick={handleClickOpen}>
        Delete Goal
      </button>
      <button
        onClick={() => {
          setEditing(true);
        }}
      >
        Edit Goal
      </button>
      <Dialog
        fullScreen={fullScreen}
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {`Delete ${goal.name}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{goal.description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="default">
            No
          </Button>
          <Button
            onClick={() => {
              handleDeleteGoal(goal._id);
            }}
            color="secondary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Goal;
