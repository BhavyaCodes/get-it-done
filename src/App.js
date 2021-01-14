import React from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorageState from "./hooks/useLocalStorageState";

import GoalList from "./components/GoalList";
import NewGoalForm from "./components/NewGoalForm";

import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

// import "./App.css";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

function App(props) {
  const [globalHashTags, setGlobalHashTags] = useLocalStorageState("hashtags", [
    { _id: "0", tag: "health", color: "green" },
    { _id: "1", tag: "love", color: "red" },
    { _id: "2", tag: "personal", color: "teal" },
    { _id: "3", tag: "family", color: "lime" },
    { _id: "4", tag: "academic", color: "blue" },
  ]);
  const [goals, setGoals] = useLocalStorageState("goals", [
    {
      _id: uuidv4(),
      name: "goal 1",
      description:
        "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print",
      timeAdded: new Date(),
      duration: 1000,
      isActive: false,
      hashTags: {
        2: { _id: "2", tag: "personal", color: "teal" },
        4: { _id: "4", tag: "academic", color: "blue" },
      },
    },
    {
      _id: uuidv4(),
      name: "goal 2",
      description:
        "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print",
      timeAdded: new Date(),
      duration: 2000,
      isActive: false,
      hashTags: {
        0: { _id: "0", tag: "health", color: "green" },
        1: { _id: "1", tag: "love", color: "red" },
      },
    },
  ]);
  return (
    <div>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6">Scroll to Elevate App Bar</Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Container>
        <Box my={2}>
          <NewGoalForm setGoals={setGoals} globalHashTags={globalHashTags} />
          <GoalList
            goals={goals}
            setGoals={setGoals}
            globalHashTags={globalHashTags}
          />
        </Box>
      </Container>
    </div>
  );
}

export default App;
