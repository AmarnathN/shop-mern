import { Fab as MuiFab } from "@material-ui/core";
import React from "react";

const Fab = (props) => {
  const { variant, size, color, ariaLabel, disabled, children, ...other } = props;
  return (
    <MuiFab
      variant={variant || "round"}
      size={size || "small"}
      color={color || "inherit"}
      aria-label={ariaLabel || "myfab"}
      disabled={disabled}
      {...other}
    >
      {children}
    </MuiFab>
  );
};

export default Fab;
