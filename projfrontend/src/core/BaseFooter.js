import { makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import { MyControls } from "../components/ui/controls/MyControls";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: "flex",
    height: "100%",
    background: `linear-gradient(185deg,${theme.palette.secondary.main} 4%, white 30%)`,
    boxShadow: `0 -2px 7px 2px rgba(255, 98, 0, 0.2)`,
    justifyContent: "center",
    transform: "translateZ(19.7rem)",
  },
}));

const BaseFooter = () => {
  const classes = useStyles();
  return (
    <Paper elevation={2} square className={classes.root}>
      <Typography component="div">
        if you got any questions - <MyControls.Button text={"Contact Us"} color="secondary" />
      </Typography>
    </Paper>
  );
};

export default BaseFooter;
