// Mock DB en memoria (sirve para demo; se reinicia al reiniciar el server)
let reviewsDB = []; 
// { uid, item_id, content, createdAt }

export default function handler(req, res) {
  // GET /api/reviews?item_id=xxx
  if (req.method === "GET") {
    const { item_id } = req.query;

    const filtered = item_id
      ? reviewsDB.filter((r) => r.item_id === item_id)
      : reviewsDB;

    return res.status(200).json(filtered);
  }

 // POST /api/reviews  { uid, item_id, review }
if (req.method === "POST") {
  const { uid, item_id, review } = req.body || {};
  if (!uid || !item_id || !review) {
    return res.status(400).json({ message: "Datos inválidos" });
  }

  const isObject = typeof review === "object" && review !== null;

  const newReview = {
    uid,
    item_id,

    // ✅ si viene string -> content = string
    // ✅ si viene objeto -> content = review.content
    content: isObject ? review.content : review,

    // extra data (si viene)
    id: isObject ? review.id : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    user_id: isObject ? review.user_id : uid,
    user_name: isObject ? review.user_name : "User",

    // timestamps
    createdAt: isObject && review.createdAt ? review.createdAt : new Date().toISOString(),
  };

  reviewsDB.push(newReview);
  return res.status(201).json(newReview);
}

  // PUT /api/reviews  { uid, item_id, content }
  if (req.method === "PUT") {
    const { uid, item_id, content } = req.body || {};
    if (!uid || !item_id || !content) {
      return res.status(400).json({ message: "Datos inválidos" });
    }

    const idx = reviewsDB.findIndex((r) => r.uid === uid && r.item_id === item_id);
    if (idx === -1) return res.status(404).json({ message: "Review no encontrada" });

    reviewsDB[idx] = { ...reviewsDB[idx], content };
    return res.status(200).json(reviewsDB[idx]);
  }

  // DELETE /api/reviews?uid=...&item_id=...
  if (req.method === "DELETE") {
    const { uid, item_id } = req.query;
    if (!uid || !item_id) {
      return res.status(400).json({ message: "Faltan parámetros" });
    }

    const before = reviewsDB.length;
    reviewsDB = reviewsDB.filter((r) => !(r.uid === uid && r.item_id === item_id));
    const deleted = before !== reviewsDB.length;

    return res.status(200).json({ deleted });
  }

  return res.status(405).json({ message: "Método no permitido" });
}