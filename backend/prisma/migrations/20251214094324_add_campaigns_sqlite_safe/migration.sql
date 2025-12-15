/*
  Warnings:

  - Added the required column `payoutType` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payoutValue` to the `Campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviveCampaignId` to the `Campaign` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "CampaignZone" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "campaignId" TEXT NOT NULL,
    "zoneId" TEXT NOT NULL,
    CONSTRAINT "CampaignZone_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CampaignZone_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Campaign" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "reviveCampaignId" INTEGER NOT NULL,
    "payoutType" TEXT NOT NULL,
    "payoutValue" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Campaign_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Campaign" ("createdAt", "id", "name", "userId") SELECT "createdAt", "id", "name", "userId" FROM "Campaign";
DROP TABLE "Campaign";
ALTER TABLE "new_Campaign" RENAME TO "Campaign";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "CampaignZone_campaignId_zoneId_key" ON "CampaignZone"("campaignId", "zoneId");
