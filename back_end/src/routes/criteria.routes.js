import express from "express";
import { getAllCriteria } from "../controllers/criteria.controller.js";

const router = express.Router();

router.get("/", getAllCriteria);

export default router;
