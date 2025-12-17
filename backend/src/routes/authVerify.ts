import { Router } from "express";
import {prisma} from "../utils/prisma";

const router = Router();

router.get("/verify", async (req, res) => {
  const { token } = req.query as { token?: string };

  if (!token) {
    return res.status(400).json({ error: "Invalid token" });
  }

  const record = await prisma.emailVerificationToken.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!record || record.expiresAt < new Date()) {
    return res.status(400).json({ error: "Token expired or invalid" });
  }

  await prisma.user.update({
    where: { id: record.userId },
    data: { emailVerified: true },
  });

  await prisma.emailVerificationToken.delete({
    where: { id: record.id },
  });

  res.redirect(`${process.env.FRONTEND_URL}/login`);
});

export default router;
