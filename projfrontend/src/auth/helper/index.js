import jwt_decode from "jwt-decode";
import moment from "moment";
const { API } = require("../../backend");

export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then(() => {
        console.log("Signout Success");
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined" || !localStorage.getItem("jwt")) {
    return false;
  }
  let token = localStorage.getItem("jwt");
  var decoded = jwt_decode(token);
  if (moment.unix(decoded.exp).utc() < moment().utc()) {
    return false;
  }
  return JSON.parse(localStorage.getItem("jwt"));
};
