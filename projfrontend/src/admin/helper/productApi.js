import { API } from "../../backend";

export const createProduct = (token, product) => {
  let products = getAllProducts();
  return fetch(`${API}/product/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.log("Error creating product : " + error);
    });
};

export const getAllProducts = (limit = 10) => {
  return fetch(`${API}/products?limit=${limit}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.log("Error obtaining all products : " + error);
    });
};

export const getProduct = (token, productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.log("Error obtaining the product : " + error);
    });
};

export const updateProduct = (token, productId, productUpdate) => {
  return fetch(`${API}/product/${productId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productUpdate),
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.log("Error updating the product : " + error);
    });
};

export const deleteProduct = (token, productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.log("Error deleting the product : " + error);
    });
};
