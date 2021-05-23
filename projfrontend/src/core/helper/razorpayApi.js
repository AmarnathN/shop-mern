const { API } = require("../../backend");

exports.createRazorpayOrder = (options, token) => {
  return fetch(`${API}/razorpay`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(options),
  }).then((res) => {
    return res.json();
  });
};
