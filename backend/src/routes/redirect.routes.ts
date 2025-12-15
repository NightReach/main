import { Router } from "express";
import { prisma } from "../utils/prisma";
import { getDayStart } from "../utils/date";

const router = Router();

/**
 * Click redirect
 * /r/:zoneId
 */
router.get("/:zoneId", async (req, res) => {
  const { zoneId } = req.params;

  const zone = await prisma.zone.findUnique({
    where: { id: zoneId },
    include: {
      website: true,
      campaignZones: {
        include: {
          campaign: true,
        },
      },
    },
  });

  if (!zone || zone.campaignZones.length === 0) {
    return res.status(404).send("Invalid zone");
  }

  const campaign = zone.campaignZones[0].campaign;

  // 1️⃣ Log click
  const click = await prisma.click.create({
    data: {
      campaignId: campaign.id,
      zoneId: zone.id,
      websiteId: zone.websiteId,
      ip: req.ip || "",
      userAgent: req.headers["user-agent"] || "",
      referer: req.headers.referer || null,
    },
  });

  // 2️⃣ Daily stats (SAFE & ATOMIC)
  await prisma.dailyStat.upsert({
    where: {
      date_userId_campaignId_zoneId: {
        date: getDayStart(),
        userId: zone.website.userId,
        campaignId: campaign.id,
        zoneId: zone.id,
      },
    },
    update: {
      clicks: { increment: 1 },
    },
    create: {
      date: getDayStart(),
      userId: zone.website.userId,
      campaignId: campaign.id,
      zoneId: zone.id,
      clicks: 1,
      conversions: 0,
      revenue: 0,
    },
  });

  // 3️⃣ Redirect to Revive
  const reviveClickUrl = `http://localhost:8080/www/delivery/ck.php?zoneid=${zone.reviveZoneId}&cb=${click.id}`;

  return res.redirect(reviveClickUrl);
});

export default router;
