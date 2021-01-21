import React, { useEffect, useState } from "react";
import humanizeDuration from "humanize-duration";

import useInputState from "../hooks/useInputState";
import HashTagSelector from "./HashTagSelector";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import TextField from "@material-ui/core/TextField";

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
  deepOrange,
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
  deepOrange,
};

function EditGoal({ goal, setGoals, globalHashTags, setEditing }) {
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginBottom: theme.spacing(3),
    },
    root: {
      display: "flex",
      flexWrap: "wrap",
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "25ch",
    },
    fab: {
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    fabContainer: {
      display: "flex",
      justifyContent: "flex-end",
    },
    buttons: {
      display: "flex",
      justifyContent: "flex-end",
      paddingBottom: theme.spacing(2),
    },
    btn: {
      marginRight: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  const [name, setName, resetName] = useInputState(goal.name);
  const [desc, setDesc, resetDesc] = useInputState(goal.description);
  const [hashTags, setHashTags] = useState(goal.hashTags);

  const handleUpdateGoal = (e) => {
    e.preventDefault();
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
    <Paper elevation={2} className={classes.paper}>
      <form onSubmit={handleUpdateGoal}>
        <div className={classes.root}>
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            align="center"
            style={{ fontSize: "3rem", marginTop: "1.5rem" }}
          >
            You're in the edit mode ;)
          </Typography>
          {/* <label>Name</label>
      <input value={name} required onChange={setName} /> */}
          <TextField
            id="asdf9wje9r"
            label="Goal title"
            style={{ margin: 8 }}
            fullWidth
            margin="dense"
            value={name}
            required
            onChange={setName}
          />
          {/* <br />
        <label>Description</label>
        <input value={desc} onChange={setDesc} /> */}
          {/* <br /> */}
          <TextField
            id="standard-fuadasdll-width-2"
            label="Goal description"
            style={{ margin: 8 }}
            fullWidth
            margin="dense"
            value={desc}
            onChange={setDesc}
          />
          <HashTagSelector
            hashTags={hashTags}
            setHashTags={setHashTags}
            globalHashTags={globalHashTags}
          />
        </div>
        <div className={classes.buttons}>
          <Button
            className={classes.btn}
            color="secondary"
            type="button"
            onClick={handleCancel}
            variant="contained"
            size="large"
          >
            Cancel
          </Button>
          <Button
            className={classes.btn}
            variant="contained"
            type="submit"
            size="large"
          >
            save
          </Button>
        </div>
      </form>
    </Paper>
  );
}

function Goal({ goal, setGoals, globalHashTags }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(3),
    },
    TitleAndOptionsContainer: {
      display: "flex",
      justifyContent: "space-between",
    },
    hashTag: {
      margin: theme.spacing(1),
    },
    startButton: {
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(2),
    },
    desc: {
      fontSize: "1.2rem",
      fontWeight: "100",
    },
  }));
  const classes = useStyles();
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

  //3 dot menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

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
        <ColorButton
          className={classes.hashTag}
          size="small"
          key={hashTags[key]._id}
        >
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
    <Paper className={classes.root} elevation={2}>
      <div className={classes.TitleAndOptionsContainer}>
        <Typography variant="h4" gutterBottom>
          {goal.name}
        </Typography>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleCloseMenu}
        >
          <MenuItem
            onClick={() => {
              handleCloseMenu();
              setEditing(true);
            }}
          >
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Edit</Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClickOpen();
              handleCloseMenu();
            }}
          >
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Delete</Typography>
          </MenuItem>
        </Menu>
      </div>
      <Typography
        variant="body1"
        className={classes.desc}
        gutterBottom
        style={{ fontSize: "1.4rem" }}
      >
        {goal.description}
      </Typography>
      {/* <p>{new Date(goal.timeAdded).toString()}</p> */}
      <Typography variant="overline" component="p" gutterBottom>
        {" "}
        You have spent{" "}
        {humanizeDuration(displaySeconds * 1000, { round: true })} on this task
      </Typography>
      {goal?.hashTags &&
        goal?.hashTags?.length !== 0 &&
        renderHashTags(goal.hashTags)}

      {/* <p>Duration variable - {goal.duration}</p> */}
      {/* <Button variant="contained" color="primary" onClick={handleStartPause}>
        {goal.isActive ? "pause" : "start"}
      </Button> */}
      <div className={classes.startButton}>
        {goal.isActive ? (
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<PauseIcon />}
            onClick={handleStartPause}
          >
            pause
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<PlayArrowIcon />}
            onClick={handleStartPause}
          >
            start
          </Button>
        )}
      </div>
      {/* <button type="button" onClick={handleClickOpen}>
        Delete Goal
      </button> */}
      {/* <button
        onClick={() => {
          setEditing(true);
        }}
      >
        Edit Goal
      </button> */}
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
    </Paper>
  );
}

export default Goal;
