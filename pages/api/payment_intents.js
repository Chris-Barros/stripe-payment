// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Stripe from "stripe";

const stripe = new Stripe(process.env.SECRET_KEY);

const items = {
  1: { cost: 4.99, name: "mystery 1", id:1 },
  2: { cost: 9.99, name: "mystery 2" ,id:2},
  3: { cost: 19.99, name: "mystery 3" ,id:3},
  4: { cost: 2.33, name: "mystery 4" ,id:4},
  5: { cost: 2.33, name: "mystery 5" ,id:5},
};
let totalCost;
export default async (req, res) => {
  console.log("request", req.body);
  totalCost = 0;
  Object.keys(req.body).map(([id]) => {
    console.log("item id", req.body[id])
    if (items[id]) {
      totalCost += items[id].cost * req.body[id].count;
      console.log("item exists", items[id])
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
