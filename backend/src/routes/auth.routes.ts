import { Router } from "express";
import { prisma } from "../utils/prisma";
import { hashPassword, verifyPassword } from "../auth/password";
import { signToken } from "../auth/jwt";
import crypto from "crypto";

const router = Router();

// ❌ Do NOT allow ADMIN self-registration
const ALLOWED_ROLES = ["PUBLISHER", "ADVERTISER"] as const;

/**
 * REGISTER
 * - Creates user
 * - Sends verification email
 * - DOES NOT issue JWT
 */
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
      emailVerified: false,
    },
  });

  // 🔐 Create verification token
  const token = crypto.randomBytes(32).toString("hex");

  await prisma.emailVerificationToken.create({
    data: {
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 30), // 30 min
    },
  });

  // 📧 Send email (DEV: console log)
  const verifyUrl = `${process.env.FRONTEND_URL}/verify?token=${token}`;
  console.log("📧 Verify email:", verifyUrl);

  res.json({
    success: true,
    message: "Verification email sent",
  });
});

/**
 * VERIFY EMAIL
 */
router.get("/verify", async (req, res) => {
  const { token } = req.query as { token?: string };

  if (!token) {
    return res.status(400).json({ error: "Invalid token" });
  }

  const record = await prisma.emailVerificationToken.findUnique({
    where: { token },
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

/**
 * LOGIN
 * - Blocks unverified users
 * - Issues JWT only if verified
 */
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

  if (user.isDisabled) {
    return res.status(403).json({ error: "ACCOUNT_DISABLED" });
  }

  if (!user.emailVerified) {
    return res.status(403).json({ error: "EMAIL_NOT_VERIFIED" });
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

/**
 * RESEND VERIFICATION EMAIL
 * - Silent success (no user enumeration)
 */
router.post("/resend-verification", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email required" });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  // Always respond success (prevent user enumeration)
  if (!user || user.emailVerified) {
    return res.json({ success: true });
  }

  // Delete old tokens
  await prisma.emailVerificationToken.deleteMany({
    where: { userId: user.id },
  });

  const token = crypto.randomBytes(32).toString("hex");

  await prisma.emailVerificationToken.create({
    data: {
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 30), // 30 mins
    },
  });

  const verifyUrl = `${process.env.FRONTEND_URL}/verify?token=${token}`;

  // DEV: log email
  console.log("📧 Resent verification email:", verifyUrl);

  res.json({ success: true });
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email required" });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  // Silent success (no user enumeration)
  if (!user) {
    return res.json({ success: true });
  }

  // Clear old tokens
  await prisma.passwordResetToken.deleteMany({
    where: { userId: user.id },
  });

  const token = crypto.randomBytes(32).toString("hex");

  await prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 30), // 30 min
    },
  });

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  console.log("🔑 Password reset link:", resetUrl);

  res.json({ success: true });
});
router.post("/reset-password", async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const record = await prisma.passwordResetToken.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!record || record.expiresAt < new Date()) {
    return res.status(400).json({ error: "Invalid or expired token" });
  }

  const hashed = await hashPassword(password);

  await prisma.user.update({
    where: { id: record.userId },
    data: { password: hashed },
  });

  await prisma.passwordResetToken.delete({
    where: { id: record.id },
  });

  res.json({ success: true });
});

export default router;
