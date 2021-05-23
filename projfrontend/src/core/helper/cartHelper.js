import { API } from "../../backend";

export const modifyItemInCart = (product, user, token) => {
  if (typeof window !== undefined) {
    if (!localStorage.getItem("jwt")) {
      console.log("Need to login");
      return { error: "Please Login to add items to cart" };
    }
    return fetch(`${API}/cartItem/modify`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product: product._id,
        user: user._id,
        quantity: product.count,
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
      console.log("Error Loading user cart Items  : " + error);
    });
};

export const deleteCartItem = (cartItemId, token) => {
  return fetch(`${API}/cartItem/${cartItemId}`, {
    method: "DELETE",
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
      console.log("Error deleting Cart Item  : " + error);
    });
};

export const emptyUserCart = (token) => {
  return fetch(`${API}/user/cartItems`, {
    method: "DELETE",
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
      console.log("Error to Empty user cart Items  : " + error);
    });
};
