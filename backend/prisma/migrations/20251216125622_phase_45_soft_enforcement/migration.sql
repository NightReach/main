-- CreateTable
CREATE TABLE "AdminActionLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "adminId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "reason" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AdminActionLog_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
    "forcePaused" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Campaign_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Campaign" ("createdAt", "id", "name", "payoutType", "payoutValue", "reviveCampaignId", "status", "userId") SELECT "createdAt", "id", "name", "payoutType", "payoutValue", "reviveCampaignId", "status", "userId" FROM "Campaign";
DROP TABLE "Campaign";
ALTER TABLE "new_Campaign" RENAME TO "Campaign";
CREATE TABLE "new_FraudEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "severity" INTEGER NOT NULL,
    "userId" TEXT,
    "campaignId" TEXT,
    "zoneId" TEXT,
    "clickId" TEXT,
    "ip" TEXT,
    "userAgent" TEXT,
    "meta" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FraudEvent_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "FraudEvent_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "FraudEvent_clickId_fkey" FOREIGN KEY ("clickId") REFERENCES "Click" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_FraudEvent" ("campaignId", "clickId", "createdAt", "id", "ip", "meta", "severity", "type", "userAgent", "userId", "zoneId") SELECT "campaignId", "clickId", "createdAt", "id", "ip", "meta", "severity", "type", "userAgent", "userId", "zoneId" FROM "FraudEvent";
DROP TABLE "FraudEvent";
ALTER TABLE "new_FraudEvent" RENAME TO "FraudEvent";
CREATE INDEX "FraudEvent_type_idx" ON "FraudEvent"("type");
CREATE INDEX "FraudEvent_campaignId_idx" ON "FraudEvent"("campaignId");
CREATE INDEX "FraudEvent_zoneId_idx" ON "FraudEvent"("zoneId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
