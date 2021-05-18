import { API } from "../../backend";

export const createCategory = (categoryName, token) => {
  return fetch(`${API}/category/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(categoryName),
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.log("Error creating category : " + error);
    });
};

export const getCategory = (categoryId, token) => {
  return fetch(`${API}/category/${categoryId}`, {
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
      console.log("Error getting category : " + error);
    });
};

export const getAllCategories = (limit = 0) => {
  return fetch(`${API}/categories?limit=${limit}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log("Error getting all categories : ");
    });
};

export const deleteCategory = (categoryId, token) => {
  return fetch(`${API}/category/${categoryId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      console.log("Error Deleting the category ");
    });
};

export const updateCategory = (categoryId, categoryUpdatedName, token) => {
  return fetch(`${API}/category/${categoryId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(categoryUpdatedName),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      console.log("Error Updating the category ");
    });
};
