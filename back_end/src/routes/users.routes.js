import express from "express";
import {
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
  getCurrentUser,
} from "../controllers/users.controller.js";
import { validateLogin } from "../middlewares/validators/validate.user.middleware.js";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

router.get("/", getAllUsers);

router.get("/dashboard", checkToken, getCurrentUser);

router.patch("/:id", validateLogin, updateUser);

router.delete("/:id", deleteUser);

router.get("/:id", getUserById);

export default router;
