import React, { useEffect, useState } from "react";

import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Navigation as NavigationIcon,
  ArrowDropDownCircle as ArrowDropDownCircleIcon,
} from "@material-ui/icons";
import clsx from "clsx";

import {
  makeStyles,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Collapse,
  Avatar,
  Snackbar,
  Paper,
  Grid,
  Box,
  IconButton,
  Fab,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import { modifyItemInCart, loadCart } from "../helper/cartHelper";
import { isAuthenticated } from "../../auth/helper";
import { MyControls } from "../../components/ui/controls/MyControls";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const productDescriptionLabels = ["Description", "Price", "Stock"];

const HomeCard = ({ product, quantity = 0 }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [countOfItemsToCart, setCountOfItemsToCart] = useState(quantity);
  const [addDisabled, setAddDisabled] = useState(false);
  const [removeDisabled, setRemoveDisabled] = useState(true);
  const [addToCartDisabled, setAddToCartDisabled] = useState(true);
  const [alertToLogin, setAlertToLogin] = useState(false);
  const [error, setError] = useState("");

  const { user, token } = isAuthenticated();

  const preLoad = () => {
    setRemoveDisabled(countOfItemsToCart <= 0);
  };

  useEffect(() => {
    preLoad();
  }, []);

  const handleClose = () => {
    setError("");
    setAlertToLogin(false);
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <Snackbar
          open={error != ""}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert onClose={handleClose} severity="error">
            <p>{JSON.stringify(error)}</p>
          </Alert>
        </Snackbar>
      </div>
    );
  };

  const handleAddItemToCart = async () => {
    product.count = countOfItemsToCart;
    let response = await modifyItemInCart(product, user, token);
    if (response.error) {
      setError(response.error);
      setAlertToLogin(true);
    } else {
      setCountOfItemsToCart(0);
      setRemoveDisabled(true);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChangeCountOfItemsToCart = (event, diff) => {
    event.preventDefault();
    let count = countOfItemsToCart + diff;

    if (count >= 0) {
      setCountOfItemsToCart(count);
    }

    setAddDisabled(count === product.stock ? true : false);

    setRemoveDisabled(count === 0 ? true : false);

    setAddToCartDisabled(count > 0 ? false : true);
  };

  const numberOfItemsToCart = () => {
    return (
      <Grid item xs={12} sm={12} lg={12} container direction="row" justify="center" alignItems="center">
        <Grid container xs={12} sm={12} md={12} lg={12} direction="row" justify="space-between">
          <Fab size="small" color="secondary" aria-label="remove" disabled={removeDisabled}>
            <RemoveIcon onClick={(event) => handleChangeCountOfItemsToCart(event, -1)} />
          </Fab>

          <Avatar>{countOfItemsToCart}</Avatar>

          <Fab size="small" color="primary" aria-label="add" disabled={addDisabled}>
            <AddIcon onClick={(event) => handleChangeCountOfItemsToCart(event, 1)} />
          </Fab>
          <MyControls.Button
            text={"Add to Cart"}
            onClick={handleAddItemToCart}
            size={"medium"}
            disabled={addToCartDisabled}
            color={"inherit"}
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <Card className={classes.root}>
      <Paper elevation={5}>
        <CardMedia style={{ height: 0, paddingTop: "56.25%" }} image={product.image} title={product.name} />
        <Grid container alignItems="center" noWrap>
          <IconButton>
            <ArrowDropDownCircleIcon
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="Description"
              color={"secondary"}
              fontSize="large"
            />
          </IconButton>
          <Typography variant="h5" component="p">
            {product.name}
          </Typography>
        </Grid>
      </Paper>
      <Grid container>
        <Grid item xs={12} sm={12} lg={12}>
          <CardActions>{numberOfItemsToCart()}</CardActions>
        </Grid>
      </Grid>
      {alertToLogin && errorMessage()}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {productDescriptionLabels.map((property) => {
            return (
              <React.Fragment>
                <Typography variant="h6">{property} </Typography>
                <Typography paragraph>
                  {property === "Price" ? `Rs.${product[property.toLowerCase()]} /-` : product[property.toLowerCase()]}
                </Typography>
              </React.Fragment>
            );
          })}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default HomeCard;
