const safeJson = async (res) => {
  try { return await res.json(); } catch { return {}; }
};

export const apiAddReview = async (uid, review, item_id) => {
  const res = await fetch("/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid, review, item_id }),
  });

  const data = await safeJson(res);
  if (!res.ok) throw new Error(data.message || "Error agregando review");
  return data;
};

export const apiEditReview = async (uid, content, item_id) => {
  const res = await fetch("/api/reviews", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid, content, item_id }),
  });

  const data = await safeJson(res);
  if (!res.ok) throw new Error(data.message || "Error editando review");
  return data;
};

export const apiDeleteReview = async (uid, item_id) => {
  const res = await fetch(`/api/reviews?uid=${encodeURIComponent(uid)}&item_id=${encodeURIComponent(item_id)}`, {
    method: "DELETE",
  });

  const data = await safeJson(res);
  if (!res.ok) throw new Error(data.message || "Error borrando review");
  return data;
};