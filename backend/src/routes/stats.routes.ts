import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  publisherStats,
  advertiserStats,
  getDailyStats,
} from "../controllers/stats.controller";


const router = Router();

router.get("/publisher", authMiddleware, publisherStats);
router.get("/advertiser", authMiddleware, advertiserStats);
router.get("/daily", authMiddleware, getDailyStats);


export default router;
