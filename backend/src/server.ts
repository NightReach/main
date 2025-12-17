import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";

const app = express(); // ✅ CREATE FIRST

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes); // ✅ USE AFTER CREATION

app.get("/health", (_req, res) => {
  res.json({
    status: "OK",
    service: "NightReach Backend",
  });
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`🚀 NightReach backend running on port ${PORT}`);
});
import { authMiddleware } from "./middleware/auth.middleware";


app.get("/api/me", authMiddleware, (req: any, res) => {
  res.json({
    message: "Authenticated",
    user: req.user,
  });
});

import websiteRoutes from "./routes/website.routes";

app.use("/api/websites", websiteRoutes);

import zoneRoutes from "./routes/zone.routes";

app.use("/api/zones", zoneRoutes);

import campaignRoutes from "./routes/campaign.routes";

app.use("/api/campaigns", campaignRoutes);

import redirectRoutes from "./routes/redirect.routes";

app.use("/r", redirectRoutes);

import postbackRoutes from "./routes/postback.routes";

app.use("/postback", postbackRoutes);

import statsRoutes from "./routes/stats.routes";

app.use("/api/stats", statsRoutes);

import adminRoutes from "./routes/admin.routes";

app.use("/api/admin", adminRoutes);

import debugRiskRoutes from "./routes/debugRisk";
app.use("/debug", debugRiskRoutes);

import authSignup from "./routes/authSignup";
import authVerify from "./routes/authVerify";

app.use("/api/auth", authSignup);
app.use("/api/auth", authVerify);

import adminUsers from "./routes/adminUsers";

app.use("/api/admin", adminUsers);

import adminCampaigns from "./routes/adminCampaigns";

app.use("/api/admin", adminCampaigns);

import adminFraud from "./routes/adminFraud";

app.use("/api/admin", adminFraud);