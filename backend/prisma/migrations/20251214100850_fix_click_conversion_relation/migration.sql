/*
  Warnings:

  - Made the column `clickId` on table `Conversion` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Conversion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "campaignId" TEXT NOT NULL,
    "clickId" TEXT NOT NULL,
    "payout" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Conversion_clickId_fkey" FOREIGN KEY ("clickId") REFERENCES "Click" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Conversion_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Conversion" ("campaignId", "clickId", "createdAt", "id", "payout") SELECT "campaignId", "clickId", "createdAt", "id", "payout" FROM "Conversion";
DROP TABLE "Conversion";
ALTER TABLE "new_Conversion" RENAME TO "Conversion";
CREATE UNIQUE INDEX "Conversion_clickId_key" ON "Conversion"("clickId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
