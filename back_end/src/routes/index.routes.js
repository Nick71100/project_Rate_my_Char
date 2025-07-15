import { Router } from "express";
import checkToken from "../middlewares/checkToken.js";
import checkRole from "../middlewares/checkRole.js";

import charactersRouter from "./characters.routes.js";
import usersRouter from "./users.routes.js";
import authRouter from "./auth.routes.js";
import artworkRouter from "./artwork.routes.js";
import genderRouter from "./gender.routes.js";
import categorieRouter from "./categorie.routes.js";
import adminRouter from "./admin.routes.js";
import voteRouter from "./votes.routes.js";
import criteriaRouter from "./criteria.routes.js";
import artworkCategorieRoutes from "./artworkCategorie.routes.js";

const router = Router();

router.use("/characters", charactersRouter);
router.use("/users", usersRouter);
router.use("/auth", authRouter);
router.use("/artworks", artworkRouter);
router.use("/gender", genderRouter);
router.use("/categories", categorieRouter);
router.use("/admin", checkToken, checkRole(1), adminRouter);
router.use("/votes", voteRouter);
router.use("/criteria", criteriaRouter);
router.use("/api/artwork-categories", artworkCategorieRoutes);

export default router;
