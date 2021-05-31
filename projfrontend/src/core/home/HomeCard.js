import React, { useEffect, useState } from "react";

import { Add as AddIcon, Remove as RemoveIcon, ArrowDropDownCircle as ArrowDropDownCircleIcon } from "@material-ui/icons";
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
  Paper,
  Grid,
  IconButton,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import { modifyItemInCart, loadCart } from "../helper/cartHelper";
import { isAuthenticated } from "../../auth/helper";
import { MyControls } from "../../components/ui/controls/MyControls";
import { theme } from "../Theme";

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

const HomeCard = (props) => {
  const { product, quantity = 0, notify, setNotify } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [countOfItemsToCart, setCountOfItemsToCart] = useState(quantity);
  const [addDisabled, setAddDisabled] = useState(false);
  const [removeDisabled, setRemoveDisabled] = useState(true);
  const [addToCartDisabled, setAddToCartDisabled] = useState(true);

  const { user, token } = isAuthenticated();

  const handleAddItemToCart = async () => {
    product.count = countOfItemsToCart;
    let response = await modifyItemInCart(product, user, token);
    if (response.error) {
      setNotify({ isOpen: true, alertMessage: response.error, alertType: "error" });
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
          <MyControls.Fab color="secondary" disabled={removeDisabled}>
            <RemoveIcon onClick={(event) => handleChangeCountOfItemsToCart(event, -1)} />
          </MyControls.Fab>
          <Avatar>{countOfItemsToCart}</Avatar>
          <MyControls.Fab color="primary" disabled={addDisabled}>
            <AddIcon onClick={(event) => handleChangeCountOfItemsToCart(event, 1)} />
          </MyControls.Fab>
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
