export const apiGetItems = async () => {
  const res = await fetch("/api/items");
  const data = await res.json();

  if (!res.ok) {
    const err = new Error(data.message || "Error cargando items");
    err.code = "items/fetch-failed";
    throw err;
  }

  return data; // array de items
};