import { Router } from "express";
import { prisma } from "../utils/prisma";
import { authMiddleware } from "../middleware/auth.middleware";
import { adminOnly } from "../middleware/admin.middleware";

const router = Router();

/**
 * GET FRAUD EVENTS (ADMIN)
 */
router.get(
  "/fraud",
  authMiddleware,
  adminOnly,
  async (_req, res) => {
    const events = await prisma.fraudEvent.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
    });

    res.json(events);
  }
);

export default router;
