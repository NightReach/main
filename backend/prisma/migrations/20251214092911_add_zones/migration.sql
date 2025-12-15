-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Zone" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "websiteId" TEXT NOT NULL,
    "reviveZoneId" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Zone_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Zone" ("createdAt", "height", "id", "reviveZoneId", "websiteId", "width") SELECT "createdAt", "height", "id", "reviveZoneId", "websiteId", "width" FROM "Zone";
DROP TABLE "Zone";
ALTER TABLE "new_Zone" RENAME TO "Zone";
CREATE INDEX "Zone_websiteId_idx" ON "Zone"("websiteId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
