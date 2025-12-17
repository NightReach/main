import { Router } from "express";
import { prisma } from "../utils/prisma";
import { authMiddleware } from "../middleware/auth.middleware";
import { adminOnly } from "../middleware/admin.middleware";

const router = Router();

/**
 * GET ALL CAMPAIGNS (ADMIN)
 */
router.get(
  "/campaigns",
  authMiddleware,
  adminOnly,
  async (_req, res) => {
    const campaigns = await prisma.campaign.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { email: true },
        },
      },
    });

    res.json(campaigns);
  }
);

/**
 * FORCE PAUSE / RESUME CAMPAIGN
 */
router.post(
  "/campaigns/:id/toggle",
  authMiddleware,
  adminOnly,
  async (req, res) => {
    const { id } = req.params;

    const campaign = await prisma.campaign.findUnique({
      where: { id },
    });

    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    const updated = await prisma.campaign.update({
      where: { id },
      data: { forcePaused: !campaign.forcePaused },
    });

    res.json({
      success: true,
      forcePaused: updated.forcePaused,
    });
  }
);

export default router;
