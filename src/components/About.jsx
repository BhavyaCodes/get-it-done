import React from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    aboutDiv: {
        marginTop: 20,
        padding: 15,
    },
}));

const About = () => {
    const history = useHistory();
    const styles = useStyles();

    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                    history.push("/");
                }}
            >
                Go Back
            </Button>
            <Paper elevation={1} className={styles.aboutDiv}>
                <h1 style={{ fontWeight: 300 }}>Get It Done</h1>

                <h3 style={{ fontWeight: 400 }}>
                    Goal tracker app made with my friend for a hackthon that we
                    won. The challenge for the hackathon was to make a CRUDy web
                    application for goal management. The application is made
                    using <b>React</b> and styled using <b>material-ui</b>.
                    <br />
                    <br />
                    Features of the app are create, update, edit and delete
                    goals. Add labels to goal, Start a timer to track the time
                    spent for goal,
                    <b>timer keeps running even when the window is closed</b>!
                    Filter goals by hashtag and/or text, sort goals by time
                    spent per goal. View a Bar graph that displays the amount of
                    time spent per goal.
                </h3>

                <h2 style={{ fontWeight: 300 }}>Features</h2>

                <ul>
                    <li>
                        <h3 style={{ fontWeight: 400 }}>Add Goal</h3>
                    </li>
                    <li>
                        <h3 style={{ fontWeight: 400 }}>Edit Goal</h3>
                    </li>
                    <li>
                        <h3 style={{ fontWeight: 400 }}>Start/Pause Timer</h3>
                    </li>
                    <li>
                        <h3 style={{ fontWeight: 400 }}>Filter Goals</h3>
                    </li>
                    <li>
                        <h3 style={{ fontWeight: 400 }}>
                            Visualize your goals
                        </h3>
                    </li>
                    <li>
                        <h3 style={{ fontWeight: 400 }}>Dark Mode</h3>
                    </li>
                </ul>
            </Paper>
        </div>
    );
};

export default About;
