const safeJson = async (res) => {
  try { return await res.json(); } catch { return {}; }
};

export async function apiSignIn(email, password) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await safeJson(res);
  if (!res.ok) {
    const err = new Error(data.message || "Error de login");

    err.code = res.status === 401 ? "auth/wrong-password" : "auth/network-request-failed";
    throw err;
  }


  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data; // {token, user}
}

export async function apiCreateAccount(email, password) {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await safeJson(res);
  if (!res.ok) {
    const err = new Error(data.message || "Error creando cuenta");
    err.code = res.status === 409 ? "auth/email-already-in-use" : "auth/network-request-failed";
    throw err;
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
}

export async function apiSignOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return true;
}

export async function apiGetCurrentUser() {
  const raw = localStorage.getItem("user");
  if (!raw) return null;
  return JSON.parse(raw);
}