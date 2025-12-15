import { Router } from "express";
import {
  addWebsite,
  listWebsites,
} from "../controllers/website.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, addWebsite);
router.get("/", authMiddleware, listWebsites);
import { listWebsiteZones } from "../controllers/website.controller";

router.get("/:websiteId/zones", authMiddleware, listWebsiteZones);

export default router;
