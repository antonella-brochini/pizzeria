export const generateId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;
export const serverTimestamp = () => new Date().toISOString();