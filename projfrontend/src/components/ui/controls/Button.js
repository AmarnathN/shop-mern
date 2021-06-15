import { Button as MuiButton, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: "none",
  },
  shape: {
    borderRadius: "4px",
  },
}));

const Button = (props) => {
  const classes = useStyles();
  const { text, size, color, variant, onClick, ...other } = props;
  return (
    <MuiButton
      className={classes.shape}
      classes={{ root: classes.root, label: classes.label }}
      variant={variant || "contained"}
      size={size || "small"}
      color={color || "primary"}
      onClick={onClick}
      {...other}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
