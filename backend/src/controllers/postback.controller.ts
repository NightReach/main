import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { getDayStart } from "../utils/date";

export const postback = async (req: Request, res: Response) => {
  const { campaignId } = req.params;

  // ✅ Extract query params ONCE
  const clickId = req.query.click_id as string | undefined;
  const payoutValue = req.query.payout as string | undefined;

  if (!clickId || !payoutValue) {
    return res.status(400).send("Missing click_id or payout");
  }

  // 1️⃣ Find click WITH campaign (single query)
  const click = await prisma.click.findUnique({
    where: { id: clickId },
    include: { campaign: true },
  });

  if (!click || click.campaignId !== campaignId) {
    return res.status(404).send("Click not found");
  }

  // 🚨 FORCE-PAUSE CHECK (ADMIN KILL SWITCH)
  if (click.campaign.forcePaused) {
    return res.json({ success: true }); // silent ignore
  }

  // ---- FRAUD DETECTION (FAST CONVERSION) ----
  const secondsDiff =
    (Date.now() - click.createdAt.getTime()) / 1000;

  if (secondsDiff < 3) {
    await prisma.fraudEvent.create({
      data: {
        type: "FAST_CONVERSION",
        severity: 5,
        clickId: click.id,
        campaignId,
        ip: click.ip,
        userAgent: click.userAgent,
        meta: JSON.stringify({
          secondsDiff: Number(secondsDiff.toFixed(2)),
        }),
      },
    });
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
      payout: Number(payoutValue),
    },
  });

  // 4️⃣ Update DAILY STATS
  await prisma.dailyStat.upsert({
    where: {
      date_userId_campaignId_zoneId: {
        date: getDayStart(),
        userId: click.campaign.userId,
        campaignId: campaignId,
        zoneId: click.zoneId,
      },
    },
    update: {
      conversions: { increment: 1 },
      revenue: { increment: Number(payoutValue) },
    },
    create: {
      date: getDayStart(),
      userId: click.campaign.userId,
      campaignId: campaignId,
      zoneId: click.zoneId,
      clicks: 0,
      conversions: 1,
      revenue: Number(payoutValue),
    },
  });

  // ---- FRAUD DETECTION (CR ANOMALY) ----
  const daily = await prisma.dailyStat.findUnique({
    where: {
      date_userId_campaignId_zoneId: {
        date: getDayStart(),
        userId: click.campaign.userId,
        campaignId: campaignId,
        zoneId: click.zoneId,
      },
    },
  });

  if (daily && daily.clicks >= 10) {
    const cr = daily.conversions / daily.clicks;

    if (cr > 0.6) {
      await prisma.fraudEvent.create({
        data: {
          type: "CR_ANOMALY",
          severity: 4,
          campaignId: campaignId,
          zoneId: click.zoneId,
          meta: JSON.stringify({
            clicks: daily.clicks,
            conversions: daily.conversions,
            cr: Number(cr.toFixed(2)),
          }),
        },
      });
    }
  }

  return res.send("OK");
};
