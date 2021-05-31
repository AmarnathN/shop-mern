import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Base from "../Base";
import CartCard from "./CartCard";
import { loadCart } from "../helper/cartHelper";
import { Button, Grid, Typography } from "@material-ui/core";
import { isAuthenticated } from "../../auth/helper";
import ProgressBar from "../common/progressBar";
import { MyControls } from "../../components/ui/controls/MyControls";

const Cart = () => {
  const [values, setValues] = useState({
    cartItems: [],
    error: "",
    isSuccess: false,
    loading: true,
    reload: false,
  });
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [reload, setReload] = useState(false);
  const { loading, cartItems, isSuccess } = values;

  const { user, token } = isAuthenticated();
  const preLoad = async () => {
    setValues({ ...values, loading: true });
    await loadCart(token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      }

      data = data.filter((item) => item.product && item.user);
      setValues({ ...values, cartItems: data, isSuccess: true, loading: false });
      let amnt = getCartTotalAmount(data);
      setCartTotalAmount(amnt);
      console.log("here");
      return data;
    });
  };

  useEffect(async () => {
    let data = await preLoad();
    let amount = cartTotalAmount;
    console.log("here2");
  }, [reload]);

  const handleRefreshCart = () => {
    setReload(!reload);
  };

  const getCartTotalAmount = (cartItems) => {
    return cartItems
      .reduce((sum, item) => {
        return sum + item.total;
      }, 0)
      .toFixed(2);
  };

  const loadCheckOut = (amount) => {
    return (
      <Grid container justify="flex-end">
        <MyControls.Box>
          <Typography variant="h5">Total cart Amount: {amount}</Typography>
        </MyControls.Box>
        <MyControls.Box>
          <MyControls.Button
            text={"Check Out"}
            size={"large"}
            variant="contained"
            component={Link}
            to={{ pathname: "/checkout", params: { cartItems, refreshCart: { handleRefreshCart } } }}
          ></MyControls.Button>
        </MyControls.Box>
      </Grid>
    );
  };

  return (
    <Base title="Cart Page" description="Checkout the items">
      {loading && ProgressBar()}
      <div>
        {cartItems.length > 0 && (
          <div>
            <React.Fragment>
              {cartItems.map((item, index) => {
                return <CartCard item={item} quantity={item.quantity} key={index} refreshCart={handleRefreshCart}></CartCard>;
              })}
            </React.Fragment>

            <MyControls.Paper>{loadCheckOut(cartTotalAmount)}</MyControls.Paper>
          </div>
        )}

        {isSuccess && values.cartItems.length == 0 && (
          <div className="row" style={{ justifyContent: "center", padding: 2 }}>
            <div className="col-md-12 bg-danger bg-gradient text-center">
              <p>Cart is empty</p>
            </div>
          </div>
        )}
      </div>
    </Base>
  );
};

export default Cart;
