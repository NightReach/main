import { Response } from "express";
import { prisma } from "../utils/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

/**
 * POST /api/zones
 */
export const createZone = async (req: AuthRequest, res: Response) => {
  const { websiteId, reviveZoneId, width, height } = req.body;

  if (!websiteId || !reviveZoneId || !width || !height) {
    return res.status(400).json({ error: "Missing fields" });
  }

  // Verify website ownership
  const website = await prisma.website.findFirst({
    where: {
      id: websiteId,
      userId: req.user!.id,
    },
  });

  if (!website) {
    return res.status(403).json({ error: "Invalid website" });
  }

  const zone = await prisma.zone.create({
    data: {
      websiteId,
      reviveZoneId: Number(reviveZoneId),
      width,
      height,
    },
  });

  res.json(zone);
};

/**
 * GET /api/zones/:id/tag
 */
export const getZoneTag = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const zone = await prisma.zone.findFirst({
    where: {
      id,
      website: {
        userId: req.user!.id,
      },
    },
  });

  if (!zone) {
    return res.status(404).json({ error: "Zone not found" });
  }

  const tag = `
<!-- NightReach Zone ${zone.id} -->
<script async src="http://localhost:8080/www/delivery/asyncjs.php"></script>
<ins
  data-revive-zoneid="${zone.reviveZoneId}"
  data-revive-id="nightreach">
</ins>
`;

  res.json({ tag });
};
