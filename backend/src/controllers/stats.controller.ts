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
export const getDailyStats = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const role = req.user!.role;

  const fromRaw = req.query.from
    ? new Date(String(req.query.from))
    : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const toRaw = req.query.to
    ? new Date(String(req.query.to))
    : new Date();

  const from = getDayStart(fromRaw);
  const to = getDayStart(toRaw);

  const where: any = {
    date: {
      gte: from,
      lte: to,
    },
  };

  if (role === "PUBLISHER") {
    where.userId = userId;
  }

  if (role === "ADVERTISER") {
    where.campaign = {
      userId,
    };
  }

  const stats = await prisma.dailyStat.findMany({
    where,
    orderBy: { date: "asc" },
  });

  res.json(stats);
};
