import { Router } from "express";
import bcrypt from "bcryptjs";
import {prisma} from "../utils/prisma";
import { generateToken } from "../utils/token";
import { sendVerificationEmail } from "../services/emailService";

const router = Router();

router.post("/signup", async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: "Missing fields" });
  }

  if (!["PUBLISHER", "ADVERTISER"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(400).json({ error: "Email already registered" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      role,
    },
  });

  const token = generateToken();

  await prisma.emailVerificationToken.create({
    data: {
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 30), // 30 min
    },
  });

  const verifyUrl = `${process.env.FRONTEND_URL}/verify?token=${token}`;

  await sendVerificationEmail(email, verifyUrl);

  res.json({ success: true });
});

export default router;
