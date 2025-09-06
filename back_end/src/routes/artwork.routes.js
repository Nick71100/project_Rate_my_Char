import { Router } from "express";
import {
  createArtwork,
  deleteArtwork,
  getAllArtworks,
  getArtworkById,
  updateArtwork,
} from "../controllers/artwork.controller.js";
import checkToken from "../middlewares/checkToken.js";

const router = Router();

router.post("/create", checkToken, createArtwork);
router.get("/", getAllArtworks);
router.get("/:id", getArtworkById);
router.patch("/:id", checkToken, updateArtwork);
router.delete("/:id", deleteArtwork);

export default router;
