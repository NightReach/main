import { Router } from "express";
import { prisma } from "../utils/prisma";
import { hashPassword, verifyPassword } from "../auth/password";
import { signToken } from "../auth/jwt";

const router = Router();

const ALLOWED_ROLES = ["ADMIN", "PUBLISHER", "ADVERTISER"] as const;

router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  if (role && !ALLOWED_ROLES.includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  const exists = await prisma.user.findUnique({
    where: { email },
  });

  if (exists) {
    return res.status(409).json({ error: "User already exists" });
  }

  const user = await prisma.user.create({
    data: {
      email,
      password: await hashPassword(password),
      role: role || "PUBLISHER",
    },
  });

  const token = signToken({
    id: user.id,
    role: user.role,
  });

  res.json({ token });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const valid = await verifyPassword(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = signToken({
    id: user.id,
    role: user.role,
  });

  res.json({ token });
});

export default router;
