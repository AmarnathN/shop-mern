import React, { useEffect, useState } from "react";

import Base from "../Base";
import CartCard from "./CartCard";
import { loadCart } from "../helper/cartHelper";
import { Button } from "@material-ui/core";
import { isAuthenticated } from "../../auth/helper";
import ProgressBar from "../common/progressBar";

const Cart = () => {
  const [values, setValues] = useState({
    cartItems: [],
    error: "",
    isSuccess: false,
    loading: true,
  });
  const { loading, products } = values;

  const { user, token } = isAuthenticated();
  const preLoad = () => {
    loadCart(token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      }
      data = data.filter((item) => item.product && item.user);

      setValues({ ...values, cartItems: data, loading: false });
    });
  };

  useEffect(() => {
    preLoad();
  }, []);

  const loadCheckOut = () => {
    return <Button variant="contained">Checkout</Button>;
  };
  return (
    <Base title="Cart Page" description="Checkout the items">
      <div className="row" style={{ justifyContent: "center", padding: 4 }}>
        {loadCheckOut()}
      </div>
      {loading && ProgressBar()}
      {!loading && (
        <div className="row bg-gradient">
          {values.cartItems &&
            values.cartItems.map((item) => {
              return (
                <div className="col-lg-4 col-md-6 col-sm-6 gy-4">
                  <CartCard product={item.product} quantity={item.quantity} addToCart={false} removeFromCart={true}></CartCard>
                </div>
              );
            })}
        </div>
      )}
    </Base>
  );
};

export default Cart;
