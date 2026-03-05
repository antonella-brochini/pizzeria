export const apiUpdateProfile = async (id, updates) => {
  const res = await fetch("/api/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id, updates })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};