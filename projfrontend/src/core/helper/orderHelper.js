import { API } from "../../backend";

export const createOrder = (token, orderData) => {
  return fetch(`${API}/order/create/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.log("Error modify Item  : " + error);
    });
};
