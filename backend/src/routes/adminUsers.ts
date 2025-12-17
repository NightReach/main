import { Router } from "express";
import { prisma } from "../utils/prisma";
import { authMiddleware } from "../middleware/auth.middleware";
import { adminOnly } from "../middleware/admin.middleware";

const router = Router();

/**
 * GET ALL USERS (ADMIN ONLY)
 */
router.get(
  "/users",
  authMiddleware,
  adminOnly,
  async (_req, res) => {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        role: true,
        emailVerified: true,
        isDisabled: true,
        createdAt: true,
      },
    });

    res.json(users);
  }
);

/**
 * ENABLE / DISABLE USER (ADMIN ONLY)
 */
router.post(
  "/users/:id/toggle",
  authMiddleware,
  adminOnly,
  async (req, res) => {
    const { id } = req.params;

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { isDisabled: !user.isDisabled },
    });

    res.json({ success: true, isDisabled: updated.isDisabled });
  }
);

export default router;
