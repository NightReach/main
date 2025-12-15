import { prisma } from "../utils/prisma";
import { AuthRequest } from "../middleware/auth.middleware";
import { Response } from "express";

export const createCampaign = async (req: AuthRequest, res: Response) => {
  const { name, reviveCampaignId, payoutType, payoutValue } = req.body;

  if (!name || !reviveCampaignId || !payoutType || !payoutValue) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const allowedPayouts = ["CPC", "CPA", "CPM"];
  if (!allowedPayouts.includes(payoutType)) {
    return res.status(400).json({ error: "Invalid payoutType" });
  }

  const campaign = await prisma.campaign.create({
    data: {
      name,
      reviveCampaignId: Number(reviveCampaignId),
      payoutType,
      payoutValue: Number(payoutValue),
      userId: req.user!.id,
    },
  });

  res.json(campaign);
};

export const listCampaigns = async (req: AuthRequest, res: Response) => {
  const campaigns = await prisma.campaign.findMany({
    where: { userId: req.user!.id },
    orderBy: { createdAt: "desc" },
  });

  res.json(campaigns);
};

export const attachCampaignToZone = async (
  req: AuthRequest,
  res: Response
) => {
  const { campaignId, zoneId } = req.body;

  if (!campaignId || !zoneId) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const campaign = await prisma.campaign.findFirst({
    where: { id: campaignId, userId: req.user!.id },
  });

  if (!campaign) {
    return res.status(404).json({ error: "Campaign not found" });
  }

  const zone = await prisma.zone.findUnique({
    where: { id: zoneId },
  });

  if (!zone) {
    return res.status(404).json({ error: "Zone not found" });
  }

  try {
    const link = await prisma.campaignZone.create({
      data: { campaignId, zoneId },
    });

    res.json(link);
  } catch {
    res.status(409).json({ error: "Campaign already attached to this zone" });
  }
};
