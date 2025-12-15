import { Response } from "express";
import { prisma } from "../utils/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

export const getDailyStats = async (req: AuthRequest, res: Response) => {
  const stats = await prisma.dailyStat.findMany({
    where: { userId: req.user!.id },
    orderBy: { date: "asc" },
  });

  res.json(stats);
};
