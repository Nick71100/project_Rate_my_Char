import { Router } from "express";
import {
  createUser,
  getCurrentUser,
  login,
  logout,
  verifyEmail,
} from "../controllers/auth.controller.js";
import checkToken from "../middlewares/checkToken.js";
import {
  validateLogin,
  validateReg,
  handleValidation,
} from "../middlewares/validators/validate.user.middleware.js";
import { loginLimiter } from "../utils/loginLimiter.js";

const router = Router();

router.post("/create", validateReg, handleValidation, createUser);
router.post("/login", loginLimiter, validateLogin, handleValidation, login);
router.post("/logout", logout);
router.get("/verify-email/:token", verifyEmail);
router.get("/me", checkToken, getCurrentUser);

export default router;
