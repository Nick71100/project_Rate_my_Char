import { Router } from "express";
import {
  createCategorie,
  deleteCategorie,
  getAllCategories,
  getCategorieById,
  updateCategorie,
} from "../controllers/categorie.controller.js";

const router = Router();

router.post("/create", createCategorie);
router.get("/", getAllCategories);
router.get("/:id", getCategorieById);
router.patch("/:id", updateCategorie);
router.delete("/:id", deleteCategorie);

export default router;
