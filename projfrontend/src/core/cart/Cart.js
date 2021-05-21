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
  const { loading, products, isSuccess } = values;

  const { user, token } = isAuthenticated();
  const preLoad = () => {
    setValues({ ...values, loading: true });
    loadCart(token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      }

      data = data.filter((item) => item.product && item.user);
      setValues({ ...values, cartItems: data, isSuccess: true, loading: false });
    });
  };

  useEffect(() => {
    preLoad();
  }, []);

  const loadCheckOut = () => {
    return <Button variant="contained">Checkout</Button>;
  };
  const handleRefreshCart = () => {
    preLoad();
  };

  return (
    <Base title="Cart Page" description="Checkout the items">
      {loading && ProgressBar()}
      <div>
        {values.cartItems.length > 0 && (
          <div className="row bg-gradient">
            <div className="row" style={{ justifyContent: "center", padding: 4 }}>
              {loadCheckOut()}
            </div>
            {values.cartItems.map((item) => {
              return (
                <div className="col-lg-4 col-md-6 col-sm-6 gy-4">
                  <CartCard item={item} refreshCart={handleRefreshCart}></CartCard>
                </div>
              );
            })}
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
