import { Router } from "express";
import { createZone, getZoneTag } from "../controllers/zone.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createZone);
router.get("/:id/tag", authMiddleware, getZoneTag);

export default router;
