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
