const Razorpay = require("razorpay");
const { v1: uuidv1 } = require("uuid");
const razorpay = new Razorpay({
  key_id: "rzp_test_eamzzycMSdifFk",
  key_secret: "gJzgnMbWp0W15klFB88pdq6l",
});

exports.createRazorpayOrder = (req, res) => {
  const defaultCurrency = "INR";
  const razorpayOptions = {
    amount: Number.parseInt(req.body.amount) * 100,
    currency: req.body.currency || defaultCurrency,
    receipt: uuidv1(),
    notes: req.body.notes || { note_key: `BE Mern shop order`.toString() },
  };
  console.log(razorpayOptions);
  razorpay.orders.create(razorpayOptions, (err, order) => {
    if (err) {
      return res.status(500).json({ message: "Error creating Razorpay order", error: err });
    }
    res.json(order);
  });
};
