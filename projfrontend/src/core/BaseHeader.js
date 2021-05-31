import React, { useEffect, useState } from "react";
import { AppBar, Badge, IconButton, ListItemText, makeStyles, ListItem, Toolbar, Typography } from "@material-ui/core";
import { AccountCircle, Menu as MenuIcon, ShoppingCart as ShoppingCartIcon } from "@material-ui/icons";
import { isAuthenticated, signout } from "../auth/helper";
import { loadCart } from "./helper/cartHelper";
import SignInOrUp from "../components/login/SignInOrUp";
import { MyControls } from "../components/ui/controls/MyControls";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  grow: {
    flexGrow: 1,
  },
}));

const BaseHeader = (props) => {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { user, token } = isAuthenticated();

  const preLoad = async () => {
    if (isAuthenticated()) {
      await loadCart(token).then((data) => {
        if (data.error) {
          return;
        }
        data = data.filter((item) => item.product && item.user);
        setCartItems(data);
      });
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  const handleLoginClick = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const toggleDrawer = (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(!drawerOpen);
  };

  const renderSignInOrUp = (
    <MyControls.PopupDialog anchorEl={anchorEl} openPopup={openPopup} handleClosePopup={handleClosePopup}>
      <SignInOrUp />
    </MyControls.PopupDialog>
  );

  const renderMenu = (
    <MyControls.Drawer toggleDrawer={toggleDrawer} drawerOpen={drawerOpen}>
      {isAuthenticated() && (
        <React.Fragment>
          <ListItem component={Link} to={user.role == "1" ? "admin/dashboard" : "user/dashboard"}>
            <ListItemText primary={"Dashboard"} />
          </ListItem>
          <ListItem
            component={Link}
            onClick={() => {
              signout(() => {});
            }}
          >
            <ListItemText primary={"SignOut"} />
          </ListItem>
        </React.Fragment>
      )}
    </MyControls.Drawer>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Material-UI
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {isAuthenticated() && (
              <React.Fragment>
                <IconButton aria-label="show cart items" color="inherit">
                  <Badge badgeContent={cartItems.length} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>

                <IconButton edge="end" onClick={toggleDrawer} color="inherit">
                  <AccountCircle />
                </IconButton>
              </React.Fragment>
            )}
            {!isAuthenticated() && <MyControls.Button text={"Login"} onClick={handleLoginClick} />}
          </div>
        </Toolbar>
      </AppBar>
      {renderSignInOrUp}
      {renderMenu}
    </div>
  );
};

export default BaseHeader;
