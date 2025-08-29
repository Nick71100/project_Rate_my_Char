import express from "express";
import {
  getPendingChars,
  approveChar,
  rejectChar,
  getAllCharsAdmin,
} from "../controllers/characters.controller.js";
import checkToken from "../middlewares/checkToken.js";
import checkRole from "../middlewares/checkRole.js";

const router = express.Router();

router.use(checkToken);
router.use(checkRole(["admin"]));

router.get("/characters/pending", getPendingChars);

router.get("/characters", getAllCharsAdmin);

router.put("/characters/:id/approve", approveChar);

router.put("/characters/:id/reject", rejectChar);

router.get("/dashboard/stats", async (req, res) => {
  try {
    const Characters = (await import("../models/characters.model.js")).default;
    const stats = await Characters.getStats();
    const pendingCount = await Characters.getPendingCount();

    res.status(200).json({
      characterStats: stats,
      pendingCount,
      totalCharacters: Object.values(stats).reduce((a, b) => a + b, 0),
    });
  } catch (error) {
    console.error("Erreur récupération stats :", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
