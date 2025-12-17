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

// 🚨 FORCE-PAUSE CHECK (THIS IS THE ONLY THING WE ADD)
if (!campaign || campaign.forcePaused) {
  return res.status(204).end(); // silently stop
}
  

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
// ---- FRAUD DETECTION (Phase 4.3 - Click Side) ----

const ip = req.ip || "";
const userAgent = req.headers["user-agent"] || "";

// 1️⃣ IP repetition (same IP, same zone, same day)
const ipClicksToday = await prisma.click.count({
  where: {
    ip,
    zoneId: zone.id,
    createdAt: {
      gte: getDayStart(new Date()),
    },
  },
});

if (ipClicksToday >= 10) {
  await prisma.fraudEvent.create({
    data: {
      type: "IP_REPEAT",
      severity: 3,
      zoneId: zone.id,
      campaignId: campaign.id,
      ip,
      meta: JSON.stringify({ ipClicksToday }),
    },
  });
}

// 2️⃣ User-Agent repetition (same UA, same day)
if (userAgent) {
  const uaClicksToday = await prisma.click.count({
    where: {
      userAgent,
      createdAt: {
        gte: getDayStart(new Date()),
      },
    },
  });

  if (uaClicksToday >= 25) {
    await prisma.fraudEvent.create({
      data: {
        type: "UA_REPEAT",
        severity: 4,
        campaignId: campaign.id,
        userAgent,
        meta: JSON.stringify({ uaClicksToday }),
      },
    });
  }
}

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
