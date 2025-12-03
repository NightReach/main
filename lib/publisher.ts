// lib/publisher.ts
import db from "./db";

export async function getPublisherStats(publisherId: number) {
  const totalClicks = await db.click.count({ where: { publisherId } });
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayClicks = await db.click.count({
    where: {
      publisherId,
      timestamp: { gte: today },
    },
  });

  const domains = await db.domain.findMany({
    where: { publisherId },
    orderBy: { createdAt: "desc" },
  });

  return { totalClicks, todayClicks, domains };
}

export async function createDomain(publisherId: number, url: string, token: string) {
  return db.domain.create({
    data: {
      publisherId,
      url,
      verifyToken: token,
    },
  });
}

export async function getDomainById(id: number) {
  return db.domain.findUnique({ where: { id } });
}

export async function markDomainVerified(id: number) {
  return db.domain.update({
    where: { id },
    data: { verified: true },
  });
}
