import React, { useEffect, useState } from "react";
import { AppBar, Badge, IconButton, ListItemText, makeStyles, ListItem, Toolbar, Typography, Link } from "@material-ui/core";
import { AccountCircle, BrandingWatermark, Menu as MenuIcon, ShoppingCart as ShoppingCartIcon } from "@material-ui/icons";
import { isAuthenticated, signout } from "../auth/helper";
import { loadCart } from "./helper/cartHelper";
import SignInOrUp from "../components/login/SignInOrUp";
import { MyControls } from "../components/ui/controls/MyControls";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {},
  grow: {
    flexGrow: 1,
  },
  root: {
    height: "100%",
    backgroundColor: theme.palette.theme.main,
    transform: "translateZ(-19.7rem)",
    background: `linear-gradient(165deg,white 75%,${theme.palette.theme.main}  95%)`,
    boxShadow: `0 3px 5px 2px rgba(0, 224, 206, .3)`,
  },
}));

const BaseHeader = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [openPopup, setOpenPopup] = useState(false);
  const [cartItems, setCartItems] = useState([]);
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

  const redirectToCart = () => {
    history.push("/cart");
  };

  const redirectToHome = () => {
    history.push("/");
  };

  const redirectToDashBoard = () => {
    history.push(user.role == "1" ? "/admin/dashboard" : "/user/dashboard");
  };

  const redirectToSignOut = () => {
    signout(() => {});
    history.push("/");
  };

  const renderSignInOrUp = <SignInOrUp openPopup={openPopup} handleClosePopup={handleClosePopup} />;

  const renderMenu = (
    <MyControls.Drawer toggleDrawer={toggleDrawer} drawerOpen={drawerOpen}>
      {isAuthenticated() && (
        <React.Fragment>
          <ListItem button onClick={redirectToDashBoard} key={"Dashboard"}>
            <ListItemText primary={"Dashboard"} />
          </ListItem>
          <ListItem button onClick={redirectToSignOut} key={"SignOut"}>
            <ListItemText primary={"SignOut"} />
          </ListItem>
        </React.Fragment>
      )}
    </MyControls.Drawer>
  );

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <MyControls.ActionIconButton onClick={redirectToHome}>
          <BrandingWatermark />
          <strong>{process.env.REACT_APP_SHOP_BRAND || "Your Brand"}</strong>
        </MyControls.ActionIconButton>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          {isAuthenticated() && (
            <React.Fragment>
              <MyControls.ActionIconButton color="inherit" onClick={redirectToCart}>
                <Badge badgeContent={cartItems.length} color="secondary">
                  <ShoppingCartIcon onClick={redirectToCart} />
                </Badge>
              </MyControls.ActionIconButton>

              <MyControls.ActionIconButton color="inherit" onClick={toggleDrawer}>
                <AccountCircle />
              </MyControls.ActionIconButton>
            </React.Fragment>
          )}
          {!isAuthenticated() && <MyControls.Button text={"Login"} onClick={handleLoginClick} />}
        </div>
      </Toolbar>

      {renderSignInOrUp}
      {renderMenu}
    </AppBar>
  );
};

export default BaseHeader;
