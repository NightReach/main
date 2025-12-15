-- CreateTable
CREATE TABLE "DailyStat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "campaignId" TEXT,
    "zoneId" TEXT,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "conversions" INTEGER NOT NULL DEFAULT 0,
    "revenue" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "DailyStat_userId_date_idx" ON "DailyStat"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "DailyStat_date_userId_campaignId_zoneId_key" ON "DailyStat"("date", "userId", "campaignId", "zoneId");
