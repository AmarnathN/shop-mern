import { makeStyles, Box as MuiBox } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Box = (props) => {
  const classes = useStyles();

  const { children, ...other } = props;

  return (
    <MuiBox className={classes.root} {...other}>
      {children}
    </MuiBox>
  );
};

export default Box;
