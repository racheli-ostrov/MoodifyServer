// const express = require('express');
// const router = express.Router();
// const paypal = require('@paypal/checkout-server-sdk');

// const client = new paypal.core.PayPalHttpClient(
//   new paypal.core.SandboxEnvironment(
//     process.env.PAYPAL_CLIENT_ID,
//     process.env.PAYPAL_SECRET
//   )
// );

// router.post('/create', async (req, res) => {
//   const { plan } = req.body;

//   const priceMap = {
//     "month": "8.00",
//     "year": "80.00",
//     "Two years": "140.00",
//   };
//   const amount = priceMap[plan] || "8.00";
//   const request = new paypal.orders.OrdersCreateRequest();
//   request.prefer("return=representation");
//   request.requestBody({
//     intent: "CAPTURE",
//     purchase_units: [{
//       amount: {
//         currency_code: "USD",
//         value: amount,
//       },
//     }],
//     application_context: {
//       return_url: `${process.env.VITE_API_URL}/upgrade/success?plan=${plan}`,
//       cancel_url: `${process.env.VITE_API_URL}/upgrade/cancel`,
//     },
//   });
//   try {
//     const order = await client.execute(request);
//     const approvalUrl = order.result.links.find(link => link.rel === 'approve').href;
//     res.json({ approvalUrl });
//   } catch (err) {
//     console.error("PayPal Error:", err);
//     console.log("plan:", plan);
//     console.log("amount:", amount);
//     res.status(500).json({ error: "PayPal error" });
//   }
// });

// module.exports = router;
import express from "express";
import paypal from "@paypal/checkout-server-sdk";

const router = express.Router();

const client = new paypal.core.PayPalHttpClient(
  new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_SECRET
  )
);

router.post("/create", async (req, res) => {
  const { plan } = req.body;

  const priceMap = {
    month: "8.00",
    year: "80.00",
    "Two years": "140.00",
  };

  const amount = priceMap[plan] || "8.00";

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: amount,
        },
      },
    ],
    application_context: {
      return_url: `${process.env.VITE_API_URL}/upgrade/success?plan=${plan}`,
      cancel_url: `${process.env.VITE_API_URL}/upgrade/cancel`,
    },
  });

  try {
    const order = await client.execute(request);
    const approvalUrl = order.result.links.find(
      (link) => link.rel === "approve"
    ).href;
    res.json({ approvalUrl });
  } catch (err) {
    console.error("PayPal Error:", err);
    console.log("plan:", plan);
    console.log("amount:", amount);
    res.status(500).json({ error: "PayPal error" });
  }
});

export default router;