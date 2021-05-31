import { makeStyles, Paper as MuiPaper } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
  },
}));

const Paper = (props) => {
  const classes = useStyles();

  const { elevation, children, ...other } = props;

  return (
    <MuiPaper className={classes.root} elevation={elevation || 3} {...other}>
      {children}
    </MuiPaper>
  );
};

export default Paper;
