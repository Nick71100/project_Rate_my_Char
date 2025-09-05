import { Router } from "express";
import {
  createUser,
  login,
  logout,
  getCurrentUser,
  verifyEmail,
} from "../controllers/auth.controller.js";
import {
  validateRegistration,
  validateLogin,
} from "../middlewares/validators/validate.user.middleware.js";
import checkToken from "../middlewares/checkToken.js";

const router = Router();

router.post("/create", validateRegistration, createUser);
router.post("/login", validateLogin, login);
router.post("/logout", logout);
router.get("/me", checkToken, getCurrentUser);
router.get("/verify/:token", verifyEmail);

export default router;
