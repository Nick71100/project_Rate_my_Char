import { Router } from "express";
import { getStats } from "../controllers/admin.controller.js";
import { getAllUsers } from "../controllers/users.controller.js";
import { getAllArtworks } from "../controllers/artwork.controller.js";
import { getAllCategories } from "../controllers/categorie.controller.js";
import {
  getPendingChars,
  approveChar,
  rejectChar,
  getAllCharsAdmin,
} from "../controllers/characters.controller.js";

const router = Router();

router.get("/dashboard", getStats);
router.get("/users", getAllUsers);
router.get("/characters", getAllCharsAdmin);
router.get("/artworks", getAllArtworks);
router.get("/categories", getAllCategories);
router.get("/characters/pending", getPendingChars);
router.put("/characters/:id/approve", approveChar);
router.put("/characters/:id/reject", rejectChar);

export default router;
