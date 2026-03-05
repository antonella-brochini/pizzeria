let profileDB = {};

export default function handler(req, res) {

  if (req.method === "PUT") {
    const { id, updates } = req.body;

    profileDB[id] = {
      ...(profileDB[id] || {}),
      ...updates
    };

    return res.status(200).json(profileDB[id]);
  }

  if (req.method === "GET") {
    const { id } = req.query;

    return res.status(200).json(profileDB[id] || {});
  }

}