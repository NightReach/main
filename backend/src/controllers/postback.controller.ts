import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { getDayStart } from "../utils/date";

export const postback = async (req: Request, res: Response) => {
  const { campaignId } = req.params;
  const { click_id, payout } = req.query;

  if (!click_id || !payout) {
    return res.status(400).send("Missing click_id or payout");
  }

  // 1️⃣ Find click
  const click = await prisma.click.findFirst({
    where: {
      id: String(click_id),
      campaignId,
    },
  });

  if (!click) {
    return res.status(404).send("Click not found");
  }

  // 2️⃣ Prevent duplicate conversion
  const exists = await prisma.conversion.findUnique({
    where: { clickId: click.id },
  });

  if (exists) {
    return res.status(409).send("Duplicate conversion");
  }

  // 3️⃣ Create conversion
  await prisma.conversion.create({
    data: {
      clickId: click.id,
      campaignId,
      payout: Number(payout),
    },
  });

  // 4️⃣ Fetch campaign (for userId)
  const campaign = await prisma.campaign.findUnique({
    where: { id: campaignId },
  });

  if (!campaign) {
    return res.status(404).send("Campaign not found");
  }

  // 5️⃣ Update DAILY STATS (conversion + revenue)
  await prisma.dailyStat.upsert({
    where: {
      date_userId_campaignId_zoneId: {
        date: getDayStart(),
        userId: campaign.userId,
        campaignId: campaign.id,
        zoneId: click.zoneId,
      },
    },
    update: {
      conversions: { increment: 1 },
      revenue: { increment: Number(payout) },
    },
    create: {
      date: getDayStart(),
      userId: campaign.userId,
      campaignId: campaign.id,
      zoneId: click.zoneId,
      clicks: 0, // clicks already counted in redirect
      conversions: 1,
      revenue: Number(payout),
    },
  });

  return res.send("OK");
};
