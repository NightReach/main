import { Router } from "express";
import {
  createCampaign,
  listCampaigns,
  attachCampaignToZone,
} from "../controllers/campaign.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createCampaign);
router.get("/", authMiddleware, listCampaigns);
router.post("/attach-zone", authMiddleware, attachCampaignToZone);

export default router;
