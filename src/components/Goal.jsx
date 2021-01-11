import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

function Goal({ goal, setGoals }) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const renderHashTags = (hashTags) => {
    return hashTags.map((hashTag) => (
      <Chip key={hashTag} label={hashTag} clickable color="secondary" />
    ));
  };

  const handleDeleteGoal = (goalId) => {
    setGoals((prevGoals) => {
      return prevGoals.filter((prevGoal) => prevGoal._id !== goalId);
    });
    handleClose();
  };
  return (
    <div>
      <h4>{goal.name}</h4>
      <p>{goal.description}</p>
      <p>{new Date(goal.timeAdded).toString()}</p>
      {goal?.hashTags &&
        goal?.hashTags?.length !== 0 &&
        renderHashTags(goal.hashTags)}
      <button type="button" onClick={handleClickOpen}>
        Delete Goal
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
