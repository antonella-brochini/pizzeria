export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Método no permitido" });

  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: "Email y contraseña son obligatorios" });

  // Mock: si querés simular "email ya en uso"
  if (email === "demo@pizzeria.com") return res.status(409).json({ message: "Email ya está en uso" });

  return res.status(201).json({
    token: "mock-token-new-user",
    user: {
      uid: crypto.randomUUID?.() || `u_${Date.now()}`,
      fullname: "client",
      email,
      dateJoined: new Date().toISOString(),
    },
  });
}
