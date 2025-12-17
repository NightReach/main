import { Request, Response } from "express";
import { calculateCampaignRisk } from "../services/fraudRisk.service";

export const campaignRisk = async (req: Request, res: Response) => {
  const { id } = req.params;

  const risk = await calculateCampaignRisk(id);

  res.json(risk);
};
