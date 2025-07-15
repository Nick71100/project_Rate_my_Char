import { Router } from "express";
import { getStats } from "../controllers/admin.controller.js";
import { getAllUsers } from "../controllers/users.controller.js";
import { getAllChars } from "../controllers/characters.controllers.js";
import { getAllArtworks } from "../controllers/artwork.controller.js";
import { getAllCategories } from "../controllers/categorie.controller.js";

const router = Router();

router.get("/dashboard", getStats);
router.get("/users", getAllUsers);
router.get("/characters", getAllChars);
router.get("/artworks", getAllArtworks);
router.get("/categories", getAllCategories);

export default router;
