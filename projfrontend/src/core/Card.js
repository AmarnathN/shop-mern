import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

import { ExpandMore as ExpandMoreIcon, Add as AddIcon, Remove as RemoveIcon, Navigation as NavigationIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { Button, Collapse, Avatar, CardActionArea, Paper, Grid, Box, IconButton, Fab } from "@material-ui/core";
import { addItemToCart } from "./helper/cartHelper";

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

const MyCard = ({ product, addToCart = true, removeFromCart = false }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [countOfItemsToCart, setCountOfItemsToCart] = useState(0);
  const [addDisabled, setAddDisabled] = useState(false);
  const [removeDisabled, setRemoveDisabled] = useState(true);

  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart"></Redirect>;
    }
  };
  const handleAddItemToCart = () => {
    // product.count = countOfItemsToCart;
    addItemToCart(product, () => {
      setRedirect(true);
    });
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const showAddToCart = () => {
    return (
      <Button variant="contained" color="primary" onClick={handleAddItemToCart} disabled={removeDisabled}>
        Add To Cart
      </Button>
    );
  };

  const showRemoveFromCart = () => {
    return (
      <Button variant="contained" color="secondary">
        Remove From Cart
      </Button>
    );
  };

  const handleChangeCountOfItemsToCart = (event, diff) => {
    event.preventDefault();
    let count = countOfItemsToCart + diff;

    if (count >= 0) {
      setCountOfItemsToCart(count);
    }

    setAddDisabled(count === product.stock ? true : false);

    setRemoveDisabled(count === 0 ? true : false);
  };

  const numberOfItemsToCart = () => {
    return (
      <Grid item xs={12} sm={12} lg={12} container direction="row" justify="center" alignItems="center">
        <Grid item xs={2} sm={2} lg={2}>
          <Fab size="small" color="secondary" aria-label="remove" disabled={removeDisabled}>
            <RemoveIcon onClick={(event) => handleChangeCountOfItemsToCart(event, -1)} />
          </Fab>
        </Grid>
        <Grid item xs={2} sm={2} lg={2} justify="center">
          <Avatar>{countOfItemsToCart}</Avatar>
        </Grid>
        <Grid item xs={2} sm={2} lg={2}>
          <Fab size="small" color="primary" aria-label="add" disabled={addDisabled}>
            <AddIcon onClick={(event) => handleChangeCountOfItemsToCart(event, 1)} />
          </Fab>
        </Grid>
      </Grid>
    );
  };

  return (
    <Card className="card" color={"secondary"}>
      <Box textAlign="center" bgcolor="text.disabled">
        <CardHeader title={product.name} subheader={product.category.name} />
      </Box>
      <Paper elevation={5} bgcolor="primary">
        <CardMedia style={{ height: 0, paddingTop: "56.25%" }} image={product.image} title={product.name} />

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Description"
        >
          <ExpandMoreIcon />
        </IconButton>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{product.description}</Typography>
          </CardContent>
        </Collapse>
      </Paper>
      <CardContent>
        {getRedirect(redirect)}
        <Grid container>
          <Grid item xs={6} sm={6}>
            <Box p={1} textAlign="center" bgcolor="text.secondary">
              <Paper>
                <Typography>Price</Typography>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={6} sm={6} m={6}>
            <Box p={1} textAlign="center" bgcolor="text.disabled">
              <Paper>
                <Typography noWrap>Rs.{product.price}/- </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6} sm={6}>
            <Box p={1} textAlign="center" bgcolor="text.secondary">
              <Paper>
                <Typography>Stock</Typography>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={6} sm={6} m={6}>
            <Box p={1} textAlign="center" bgcolor="text.disabled">
              <Paper>
                <Typography noWrap>{product.stock}</Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </CardContent>

      <Grid container>
        <Grid item xs={12} sm={12} lg={12}>
          <CardActions style={{ justifyContent: "left" }}>{numberOfItemsToCart()}</CardActions>
          <CardActions style={{ justifyContent: "center" }}>
            {addToCart && showAddToCart()}
            {removeFromCart && showRemoveFromCart()}
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export default MyCard;
