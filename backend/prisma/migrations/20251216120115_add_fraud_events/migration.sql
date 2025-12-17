-- CreateTable
CREATE TABLE "FraudEvent" (
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "FraudEvent_type_idx" ON "FraudEvent"("type");

-- CreateIndex
CREATE INDEX "FraudEvent_campaignId_idx" ON "FraudEvent"("campaignId");

-- CreateIndex
CREATE INDEX "FraudEvent_zoneId_idx" ON "FraudEvent"("zoneId");
