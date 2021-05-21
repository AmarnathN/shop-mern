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

const useStyles = makeStyles((theme) => ({
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

const CartCard = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [countOfItemsToCart, setCountOfItemsToCart] = useState(props.item.quantity);
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
      setRedirect(true);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const removeFromCart = async () => {
    let response = await deleteCartItem(props.item._id, token);
    if (response.error) {
      setError(response.error);
    } else {
      props.refreshCart();
    }
  };

  const handleChangeCountOfItemsToCart = (event, diff) => {
    event.preventDefault();
    let count = countOfItemsToCart + diff;

    if (count >= 0) {
      setCountOfItemsToCart(count);
      handleAddItemToCart(diff);
    }

    setAddDisabled(count === product.stock ? true : false);

    setRemoveDisabled(count === 0 ? true : false);
  };

  const numberOfItemsToCart = () => {
    return (
      <>
        <Fab size="small" color="secondary" aria-label="remove" disabled={removeDisabled}>
          <RemoveIcon onClick={(event) => handleChangeCountOfItemsToCart(event, -1)} />
        </Fab>
        <Fab size="small" color="info" aria-label="count">
          <strong>{countOfItemsToCart}</strong>
        </Fab>
        <Fab size="small" color="primary" aria-label="add" disabled={addDisabled}>
          <AddIcon onClick={(event) => handleChangeCountOfItemsToCart(event, 1)} />
        </Fab>
      </>
    );
  };

  return (
    <Card className="card" color={"secondary"}>
      <Box textAlign="center" bgcolor="text.disabled">
        <CardHeader title={product.name} subheader={product.category.name} />
      </Box>
      <Paper elevation={5} bgcolor="primary">
        <CardMedia style={{ height: 0, paddingTop: "56.25%" }} image={product.image} title={product.name} />
        <Grid container justify="space-between">
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

          <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={removeFromCart}>
            Delete
          </Button>
        </Grid>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{product.description}</Typography>
          </CardContent>
        </Collapse>
      </Paper>
      <CardContent>
        {/* {getRedirect(redirect)} */}
        {alertToLogin && errorMessage()}
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <Box p={1} textAlign="center" bgcolor="text.secondary">
              <Paper>
                <Typography noWrap>Amount</Typography>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box p={1} textAlign="center" bgcolor="text.disabled">
              <Paper>
                <Typography noWrap>Rs.{(countOfItemsToCart * product.price).toFixed(2)} </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions>
        <Grid container justify="space-between">
          {numberOfItemsToCart()}
        </Grid>
      </CardActions>
    </Card>
  );
};

export default CartCard;
