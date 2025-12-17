import { Response } from "express";
import { prisma } from "../utils/prisma";
import { AuthRequest } from "../middleware/auth.middleware";
import { getDayStart } from "../utils/date";
/**
 * Publisher stats (by user)
 */
export const publisherStats = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;

  const clicks = await prisma.click.count({
    where: {
      website: {
        userId,
      },
    },
  });

  const conversions = await prisma.conversion.findMany({
    where: {
      campaign: {
        campaignZones: {
          some: {
            zone: {
              website: {
                userId,
              },
            },
          },
        },
      },
    },
  });

  const revenue = conversions.reduce((sum, c) => sum + c.payout, 0);

  res.json({
    clicks,
    conversions: conversions.length,
    revenue,
    epc: clicks > 0 ? revenue / clicks : 0,
  });
};

/**
 * Advertiser stats (by user)
 */
export const advertiserStats = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;

  const clicks = await prisma.click.count({
    where: {
      campaign: {
        userId,
      },
    },
  });

  const conversions = await prisma.conversion.findMany({
    where: {
      campaign: {
        userId,
      },
    },
  });

  const spend = conversions.reduce((sum, c) => sum + c.payout, 0);

  res.json({
    clicks,
    conversions: conversions.length,
    spend,
    epc: clicks > 0 ? spend / clicks : 0,
  });
};
/**
 * Daily stats (used for charts)
 * GET /api/stats/daily
 */
/**
 * Daily stats (Phase 4.2)
 * GET /api/stats/daily
 */
export const getDailyStats = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const role = req.user!.role;

  const { startDate, endDate, campaignId, zoneId, websiteId } = req.query;

  const from = startDate
    ? getDayStart(new Date(String(startDate)))
    : getDayStart(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));

  const to = endDate
    ? getDayStart(new Date(String(endDate)))
    : getDayStart(new Date());

  const where: any = {
    date: {
      gte: from,
      lte: to,
    },
  };

  // 🔐 Role enforcement
  if (role === "PUBLISHER") {
    where.userId = userId;
    if (websiteId) where.websiteId = websiteId;
    if (zoneId) where.zoneId = zoneId;
  }

  if (role === "ADVERTISER") {
    where.userId = userId;
    if (campaignId) where.campaignId = campaignId;
  }

  if (role === "ADMIN") {
    if (campaignId) where.campaignId = campaignId;
    if (zoneId) where.zoneId = zoneId;
    if (websiteId) where.websiteId = websiteId;
  }

  // 1️⃣ Time-series stats (for charts)
  const stats = await prisma.dailyStat.findMany({
    where,
    orderBy: { date: "asc" },
  });

  // 2️⃣ Aggregated totals (Phase 4.2 requirement)
  const agg = await prisma.dailyStat.aggregate({
    where,
    _sum: {
      clicks: true,
      conversions: true,
      revenue: true,
    },
  });

  const clicks = agg._sum.clicks || 0;
  const revenue = agg._sum.revenue || 0;

  // 3️⃣ Final response
  return res.json({
    stats,
    totals: {
      clicks,
      conversions: agg._sum.conversions || 0,
      revenue,
      epc: clicks > 0 ? revenue / clicks : 0,
    },
  });
};
