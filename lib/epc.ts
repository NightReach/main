import prisma from "@/lib/prisma";

export async function updateOfferEPC(offerId: number) {
  const [clicks, conversions] = await Promise.all([
    prisma.click.count({ where: { offerId } }),
    prisma.conversion.aggregate({
      where: { click: { offerId } },
      _sum: { payout: true },
    }),
  ]);

  const sum = conversions._sum.payout || 0;
  
  const epc = clicks === 0 ? 0 : sum / clicks;

  await prisma.offer.update({
    where: { id: offerId },
    data: { epc },
  });

  return epc;
}
