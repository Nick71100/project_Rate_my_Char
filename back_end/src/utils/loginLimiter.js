import { rateLimit } from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: {
    status: 429,
    error: "Trop de tentatives de connexion. Réessaie dans 15 minutes.",
  },
  standardHeaders: "draft-8",
  legacyHeaders: false,
});
