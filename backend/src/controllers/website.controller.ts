import { Response } from "express";
import { prisma } from "../utils/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

export const addWebsite = async (req: AuthRequest, res: Response) => {
  const { domain, reviveWebsiteId } = req.body;

  if (!domain || !reviveWebsiteId) {
    return res.status(400).json({
      error: "domain and reviveWebsiteId are required",
    });
  }
  const existing = await prisma.website.findFirst({
    where: {
      domain,
      userId: req.user!.id,
    },
  });
  
  if (existing) {
    return res.status(409).json({
      error: "Website already exists",
    });
  }

  const website = await prisma.website.create({
    data: {
      domain,
      reviveWebsiteId: Number(reviveWebsiteId),
      userId: req.user!.id,
    },
  });

  res.json(website);
};

export const listWebsites = async (req: AuthRequest, res: Response) => {
  const websites = await prisma.website.findMany({
    where: {
      userId: req.user!.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  res.json(websites);
};
export const listWebsiteZones = async (req: AuthRequest, res: Response) => {
    const { websiteId } = req.params;
  
    const zones = await prisma.zone.findMany({
      where: {
        websiteId,
        website: {
          userId: req.user!.id,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  
    res.json(zones);
  };