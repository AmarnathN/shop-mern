const { loadScript } = require("../../common/domHelper");
const { createRazorpayOrder } = require("../../helper/razorpayApi");

exports.displayRazorpay = async (user, paymentOptions, token) => {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  const razorPayOptions = {
    amount: paymentOptions.amount,
    currency: paymentOptions.currency,
    notes: { note: "Razor Pay Order From FE" },
  };

  const data = await createRazorpayOrder(razorPayOptions, token);

  const options = {
    key: process.env.RAZORPAY_API_KEY,
    currency: data.currency,
    amount: data.amount.toString(),
    order_id: data.id,
    name: "Donation",
    description: "Thank you for nothing. Please give us some money",
    handler: function (response) {
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature);
    },
    prefill: {
      name: user.name,
      email: user.email,
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
};
