import { prisma } from "../utils/prisma";
import { FRAUD_WEIGHTS } from "../utils/fraudScore";

export async function calculateCampaignRisk(campaignId: string) {
  const events = await prisma.fraudEvent.findMany({
    where: { campaignId },
    take: 200,
  });

  let score = 0;

  for (const e of events) {
    const weight = FRAUD_WEIGHTS[e.type] || 1;
    score += e.severity * weight;
  }

  return {
    score,
    level: score >= 80 ? "HIGH" : score >= 40 ? "MEDIUM" : "LOW",
    events: events.length,
  };
}
