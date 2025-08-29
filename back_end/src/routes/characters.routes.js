import { Router } from "express";

import {
  createChar,
  getAllChars,
  updateChar,
  deleteChar,
  getCharById,
} from "../controllers/characters.controller.js";
import validateChar from "../middlewares/validators/validate.character.middleware.js";
import checkToken from "../middlewares/checkToken.js";

const router = Router();

router.post("/", checkToken, createChar);

router.get("/", getAllChars);

router.patch("/:id", checkToken, validateChar, updateChar);

router.delete("/:id", deleteChar);

router.get("/:id", getCharById);

export default router;
