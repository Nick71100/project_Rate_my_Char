import { Router } from "express";
import {
  createRole,
  deleteRole,
  getAllRoles,
  getRoleById,
  updateRole,
} from "../controllers/role.controller.js";

const router = Router();

router.post("/create", createRole);
router.get("/", getAllRoles);
router.get("/:id", getRoleById);
router.patch("/:id", updateRole);
router.delete("/:id", deleteRole);

export default router;
