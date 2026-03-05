export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Método no permitido" });

  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: "Email y contraseña son obligatorios" });

  const isValid = email === "demo@pizzeria.com" && password === "12345678";
  if (!isValid) return res.status(401).json({ message: "Credenciales inválidas" });

  return res.status(200).json({
    token: "mock-token-abc-123",
    user: {
      uid: "u_1",
      fullname: "Antonella",
      email,
      dateJoined: new Date().toISOString(),
    },
  });
}