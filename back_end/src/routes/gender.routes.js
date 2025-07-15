import { Router } from "express";
import {
  createGender,
  deleteGender,
  getAllGenders,
  getGenderById,
  updateGender,
} from "../controllers/gender.controller.js";

const router = Router();

router.post("/create", createGender);
router.get("/", getAllGenders);
router.get("/:id", getGenderById);
router.patch("/:id", updateGender);
router.delete("/:id", deleteGender);

export default router;
