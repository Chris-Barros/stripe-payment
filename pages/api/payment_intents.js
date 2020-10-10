// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Stripe from "stripe";

const stripe = new Stripe(process.env.SECRET_KEY);

const items = {
  123: { cost: 2.33, name: "doughnut" },
};
let totalCost;
export default async (req, res) => {
  console.log("sk", process.env.SECRET_KEY);
  totalCost = 0;
  Object.keys(req.body).map((id) => {
    if (items[id]) {
      totalCost += items[id].cost * req.body[id].count;
    }
  });

  totalCost *= 100;
  console.log("totalcost:", totalCost);
  if (req.method === "POST") {
    try {
      const { amount } = req.body;
      // Psst. For production-ready applications we recommend not using the
      // amount directly from the client without verifying it first. This is to
      // prevent bad actors from changing the total amount on the client before
      // it gets sent to the server. A good approach is to send the quantity of
      // a uniquely identifiable product and calculate the total price server-side.
      // Then, you would only fulfill orders using the quantity you charged for.
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalCost,
        currency: "usd",
      });
      res.status(200).send(paymentIntent.client_secret);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
