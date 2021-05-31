import { Button, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 0,
    margin: theme.spacing(0.5),
  },
  secondary: {
    backgroundColor: theme.palette.background.main,
    "& .MuiButton-label": {
      color: theme.palette.secondary.main,
    },
  },
  primary: {
    backgroundColor: theme.palette.background.main,
    "& .MuiButton-label": {
      color: theme.palette.primary.main,
    },
  },
  theme: {
    backgroundColor: theme.palette.background,
    "& .MuiButton-label": {
      color: theme.palette.theme,
    },
  },
}));

const ActionIconButton = (props) => {
  const classes = useStyles();
  const { color, children, onClick, variant, size, ...other } = props;
  return (
    <Button
      className={`${classes.root} ${classes[color] || "theme"}`}
      onClick={onClick}
      variant={variant || "outlined"}
      size={size || "small"}
      {...other}
    >
      {children}
    </Button>
  );
};

export default ActionIconButton;
