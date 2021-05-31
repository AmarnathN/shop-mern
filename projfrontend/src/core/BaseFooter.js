import { makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: "flex",
    height: "100%",
    boxShadow: `0 -12px 20px -12px rgba(255, 98, 0, .5)`,
    justifyContent: "center",
  },
}));

const BaseFooter = () => {
  const classes = useStyles();
  return (
    <Paper elevation={2} square className={classes.root}>
      <Typography component="div">
        if you got any questions - <button className="btn btn-warning rounded">Contact Us</button>
      </Typography>
    </Paper>
  );
};

export default BaseFooter;
