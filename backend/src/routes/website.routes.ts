import { Router } from "express";
import { addWebsite } from "../controllers/website.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.post("/", requireAuth, addWebsite);

export default router;
