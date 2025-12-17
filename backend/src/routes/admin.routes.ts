import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { listFraudEvents } from "../controllers/admin.fraud.controller";
import {campaignRisk } from "../controllers/admin.risk.controller";

const router = Router();

// Admin-only middleware assumed
router.get("/fraud", authMiddleware, listFraudEvents);
router.get("/risk/campaign/:id", authMiddleware, campaignRisk);

export default router;
