/*
  Warnings:

  - You are about to drop the column `name` on the `Website` table. All the data in the column will be lost.
  - Added the required column `reviveWebsiteId` to the `Website` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Website" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "reviveWebsiteId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Website_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Website" ("createdAt", "domain", "id", "userId") SELECT "createdAt", "domain", "id", "userId" FROM "Website";
DROP TABLE "Website";
ALTER TABLE "new_Website" RENAME TO "Website";
CREATE UNIQUE INDEX "Website_userId_domain_key" ON "Website"("userId", "domain");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
