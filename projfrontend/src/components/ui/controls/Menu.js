import { Fade, Menu as MuiMenu } from "@material-ui/core";
import React from "react";

const Menu = (props) => {
  const { children, anchorEl, handleMenuClose, isMenuOpen, menuId } = props;
  return (
    <div>
      <MuiMenu anchorEl={anchorEl} id={menuId} open={isMenuOpen} keepMounted onClose={handleMenuClose} TransitionComponent={Fade}>
        {children}
      </MuiMenu>
    </div>
  );
};

export default Menu;
