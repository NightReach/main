import { Router } from "express";
import { calculateCampaignRisk } from "../services/fraudRisk.service";

const router = Router();

router.get("/risk/:campaignId", async (req, res) => {
  const risk = await calculateCampaignRisk(req.params.campaignId);
  res.json(risk);
});

export default router;
