import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export const listFraudEvents = async (req: Request, res: Response) => {
  const events = await prisma.fraudEvent.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const formatted = events.map((e) => ({
    id: e.id,
    type: e.type,
    severity: e.severity,
    campaignId: e.campaignId,
    zoneId: e.zoneId,
    clickId: e.clickId,
    ip: e.ip,
    userAgent: e.userAgent,
    meta: e.meta ? JSON.parse(e.meta) : null,
    createdAt: e.createdAt,
  }));

  res.json(formatted);
};
