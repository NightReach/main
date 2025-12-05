-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Offer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "payout" REAL NOT NULL,
    "landingUrl" TEXT NOT NULL DEFAULT '',
    "advertiserId" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "Offer_advertiserId_fkey" FOREIGN KEY ("advertiserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Offer" ("advertiserId", "description", "id", "payout", "title") SELECT coalesce("advertiserId", 1) AS "advertiserId", "description", "id", "payout", "title" FROM "Offer";
DROP TABLE "Offer";
ALTER TABLE "new_Offer" RENAME TO "Offer";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
