import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer as MuiDrawer, Button } from "@material-ui/core";

const useStyles = makeStyles({
  list: {
    width: "15Rem",
  },
  fullList: {
    width: "auto",
  },
});

export default function Drawer(props) {
  const { toggleDrawer, drawerOpen } = props;
  const classes = useStyles();

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      {props.children}
    </div>
  );

  return (
    <div>
      <React.Fragment key={"right"}>
        <MuiDrawer anchor={"right"} open={drawerOpen} onClose={toggleDrawer}>
          {list("anchor")}
        </MuiDrawer>
      </React.Fragment>
    </div>
  );
}
