import { Router } from "express";
import {
  createChar,
  getAllChars,
  updateChar,
  deleteChar,
  getCharById,
  getTopCharactersByCriteria,
} from "../controllers/characters.controller.js";
import { validateCharacterCreate } from "../middlewares/validators/validate.character.middleware.js";
import checkToken from "../middlewares/checkToken.js";

const router = Router();

router.post("/", checkToken, validateCharacterCreate, createChar);
router.get("/", getAllChars);
router.get("/top-by-criteria", getTopCharactersByCriteria);
router.patch("/:id", checkToken, validateCharacterCreate, updateChar);
router.delete("/:id", deleteChar);
router.get("/:id", getCharById);

export default router;
