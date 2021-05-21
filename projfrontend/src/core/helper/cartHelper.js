import { API } from "../../backend";

export const modifyItemInCart = (item, user, token) => {
  let cart = {};
  if (typeof window !== undefined) {
    if (!localStorage.getItem("jwt")) {
      console.log("Need to login");
      return { error: "Please Login to add items to cart" };
    }
    return fetch(`${API}/cart/modifyItem`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product: item._id,
        user: user._id,
        quantity: item.count,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .catch((error) => {
        console.log("Error modify Item  : " + error);
      });
  }
  return { error: "No Window Found" };
};

export const loadCart = (token) => {
  return fetch(`${API}/cartItems`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.log("Error modify Item  : " + error);
    });
};
