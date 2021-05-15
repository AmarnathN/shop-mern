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
    .catch((err) => {
      console.log("Error creating cateogry : " + err);
    });
};
