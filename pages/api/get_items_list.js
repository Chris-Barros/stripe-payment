// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const items = [
  { id: 1, name: "Mystery Box 1!!", count: 0, cost: 4.99 },
  { id: 2, name: "Mystery Box 2!!", count: 0, cost: 9.99 },
  { id: 3, name: "Mystery Box 3!!", count: 0, cost: 19.99 },
  // { id: 4, name: "Mystery Box 4!!", count: 0, cost: 2.33 },
  // { id: 5, name: "Mystery Box 5!!", count: 0, cost: 2.33 },
  // { id: 6, name: "Mystery Box 6!!", count: 0, cost: 2.33 },
  // { id: 7, name: "Mystery Box 7!!", count: 0, cost: 2.33 },
  // { id: 8, name: "Mystery Box 8!!", count: 0, cost: 2.33 },
  // { id: 9, name: "Mystery Box 9!!", count: 0, cost: 2.33 },
  // { id: 10, name: "Mystery Box 10!!", count: 0, cost: 2.33 },
  // { id: 11, name: "Mystery Box 11!!", count: 0, cost: 2.33 },
  // { id: 12, name: "Mystery Box 12!!", count: 0, cost: 2.33 },
  // { id: 13, name: "Mystery Box 13!!", count: 0, cost: 2.33 },
  // { id: 14, name: "Mystery Box 14!!", count: 0, cost: 2.33 },
  // { id: 15, name: "Mystery Box 15!!", count: 0, cost: 2.33 },
];

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      res.status(200).send(items);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
