import { Router } from "express";
import { postback } from "../controllers/postback.controller";

const router = Router();

router.get("/:campaignId", postback);
router.post("/:campaignId", postback);

export default router;
