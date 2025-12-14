import { prisma } from "../utils/prisma";
import { createReviveWebsite } from "../revive/reviveClient";
import { AuthRequest } from "../middleware/auth.middleware";

export const addWebsite = async (req: AuthRequest, res: any) => {
  const { domain } = req.body;

  if (!domain) {
    return res.status(400).json({ error: "Domain required" });
  }

  const reviveWebsiteId = await createReviveWebsite(domain);

  const website = await prisma.website.create({
    data: {
      domain,
      userId: req.user!.id,
      reviveWebsiteId,
    },
  });

  res.json(website);
};
