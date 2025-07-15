import { Router } from "express";
import {
  addCategoryToArtwork,
  removeCategoryFromArtwork,
  getCategoriesByArtwork,
  getArtworksByCategory,
} from "../controllers/artworkCategorie.controller.js";
import checkToken from "../middlewares/checkToken.js";

const router = Router();

router.post("/add", checkToken, addCategoryToArtwork);
router.delete("/remove", checkToken, removeCategoryFromArtwork);
router.get("/artwork/:id", getCategoriesByArtwork);
router.get("/category/:id", getArtworksByCategory);

export default router;
