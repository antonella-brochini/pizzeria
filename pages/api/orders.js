let ordersDB = [];

export default function handler(req, res) {
  if (req.method === "POST") {
    const { id, orders } = req.body;

    const newOrder = {
      id,
      orders,
      date: new Date()
    };

    ordersDB.push(newOrder);

    return res.status(200).json(newOrder);
  }

  if (req.method === "GET") {
    return res.status(200).json(ordersDB);
  }
}