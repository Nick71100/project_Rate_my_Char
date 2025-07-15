import express from "express";
import checkToken from "../middlewares/checkToken.js";
import {
  castVote,
  getRankingByCriterion,
  getUserVotes,
  getAllRankings,
} from "../controllers/votes.controller.js";

const router = express.Router();

router.post("/", checkToken, castVote);
router.get("/my-votes", checkToken, getUserVotes);
router.get("/ranking/:criterionID", getRankingByCriterion);
router.get("/rankings", getAllRankings);

export default router;
