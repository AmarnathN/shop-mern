import React, { useState } from "react";
import { isAuthenticated } from "../../auth/helper";
import Base from "../Base";
import { displayRazorpay } from "./helper/razorpay";

const Checkout = (props) => {
  const [data, setData] = useState({ loading: true, error: "", isSuccess: false, address: "", cartItems: props.location.params.cartItems });
  const { token, user } = isAuthenticated();

  const { cartItems } = data;
  const getTotalCartAmount = () => {
    return cartItems.reduce((previousValue, currentValue) => {
      return previousValue + Number(currentValue.quantity) * Number(currentValue.product.price);
    }, 0);
  };

  const openRazorpayPayment = () => {
    const options = {
      amount: getTotalCartAmount(),
      currency: "INR",
    };
    displayRazorpay(user, options, token);
  };

  return (
    <Base>
      <div>
        <p> Checkout {getTotalCartAmount()} </p>
        <button className="btn btn-primary" onClick={openRazorpayPayment}>
          Pay with Razor Pay
        </button>
      </div>
    </Base>
  );
};

export default Checkout;
