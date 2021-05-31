import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

import {
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ArrowDropDownCircle as ArrowDropDownCircleIcon,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { Button, Collapse, Avatar, Snackbar, Paper, Grid, Box, IconButton, Fab } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import { modifyItemInCart, loadCart, deleteCartItem } from "../helper/cartHelper";
import { isAuthenticated } from "../../auth/helper";
import { MyControls } from "../../components/ui/controls/MyControls";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    margin: theme.spacing(1),
  },
  media: {
    height: 100,
    width: "100%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const productDescriptionLabels = ["Description", "Price"];

const CartCard = (props) => {
  const { item, refreshCart } = props;

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [countOfItemsToCart, setCountOfItemsToCart] = useState(item.quantity);
  const [addDisabled, setAddDisabled] = useState(false);
  const [removeDisabled, setRemoveDisabled] = useState(true);
  const [alertToLogin, setAlertToLogin] = useState(false);
  const [error, setError] = useState("");

  const { user, token } = isAuthenticated();
  const product = props.item.product;

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

  const handleAddItemToCart = async (count) => {
    product.count = count;
    let response = await modifyItemInCart(product, user, token);
    if (response.error) {
      setError(response.error);
      setAlertToLogin(true);
    } else {
      props.refreshCart();
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const removeFromCart = async () => {
    let response = await deleteCartItem(props.item._id, token);
    if (response.error) {
      setError(response.error);
    }
    props.refreshCart();
  };

  const handleChangeCountOfItemsToCart = async (event, diff) => {
    let count = countOfItemsToCart + diff;

    if (count >= 0) {
      await handleAddItemToCart(diff);
      setCountOfItemsToCart(count);
    }

    setAddDisabled(count === product.stock ? true : false);

    setRemoveDisabled(count === 0 ? true : false);
  };

  const numberOfItemsToCart = () => {
    return (
      <React.Fragment>
        <Fab size="small" color="secondary" aria-label="remove" disabled={removeDisabled}>
          <RemoveIcon onClick={(event) => handleChangeCountOfItemsToCart(event, -1)} />
        </Fab>
        <Fab size="small" color="default" aria-label="count">
          <strong>{countOfItemsToCart}</strong>
        </Fab>
        <Fab size="small" color="primary" aria-label="add" disabled={addDisabled}>
          <AddIcon onClick={(event) => handleChangeCountOfItemsToCart(event, 1)} />
        </Fab>
      </React.Fragment>
    );
  };

  return (
    <Card className={classes.root}>
      <Grid container>
        <Grid item xs={3} sm={3} md={3} lg={2}>
          <MyControls.Paper square>
            <CardMedia image={product.image} title={product.name} className={classes.media} />
          </MyControls.Paper>
        </Grid>
        <Grid item xs={9} sm={9} md={9} lg={5}>
          <MyControls.Paper square>
            <Typography variant="h6" component="p">
              {product.name}
            </Typography>
            <IconButton>
              <ArrowDropDownCircleIcon
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="Description"
                color={"default"}
                fontSize="small"
              />
            </IconButton>
          </MyControls.Paper>
        </Grid>
        <Grid item xs={6} sm={3} md={3} lg={2} justify="center">
          <MyControls.Box justify="space-between">
            <CardActions>{numberOfItemsToCart()}</CardActions>
          </MyControls.Box>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={1} justify="center" alignItems="center">
          <MyControls.Box>
            <MyControls.Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={removeFromCart} text={"Remove"} />
          </MyControls.Box>
        </Grid>
        <Grid item off-set={8} xs={4} sm={3} md={3} lg={2}>
          <MyControls.Box justify={"right"}>
            <Typography noWrap>
              Amount <br /> Rs.{(countOfItemsToCart * product.price).toFixed(2)}
            </Typography>
          </MyControls.Box>
        </Grid>
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
      </Grid>
    </Card>
  );
};

export default CartCard;
