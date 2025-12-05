/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Domain` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Domain` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Domain` table. All the data in the column will be lost.
  - You are about to drop the column `verified` on the `Domain` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clickId]` on the table `Click` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `domain` to the `Domain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publisherId` to the `Domain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Click" ADD COLUMN "clickId" TEXT;
ALTER TABLE "Click" ADD COLUMN "ipAddress" TEXT;
ALTER TABLE "Click" ADD COLUMN "source" TEXT;
ALTER TABLE "Click" ADD COLUMN "subid" TEXT;
ALTER TABLE "Click" ADD COLUMN "userAgent" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Conversion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clickId" TEXT,
    "offerId" INTEGER NOT NULL,
    "payout" DECIMAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Conversion_clickId_fkey" FOREIGN KEY ("clickId") REFERENCES "Click" ("clickId") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Conversion_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Conversion" ("clickId", "createdAt", "id", "offerId") SELECT "clickId", "createdAt", "id", "offerId" FROM "Conversion";
DROP TABLE "Conversion";
ALTER TABLE "new_Conversion" RENAME TO "Conversion";
CREATE TABLE "new_Domain" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "domain" TEXT NOT NULL,
    "publisherId" INTEGER NOT NULL,
    CONSTRAINT "Domain_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Domain" ("id") SELECT "id" FROM "Domain";
DROP TABLE "Domain";
ALTER TABLE "new_Domain" RENAME TO "Domain";
CREATE TABLE "new_Offer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "payout" REAL NOT NULL,
    "advertiserId" INTEGER NOT NULL,
    "landingUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Offer_advertiserId_fkey" FOREIGN KEY ("advertiserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Offer" ("advertiserId", "id", "landingUrl", "payout", "title") SELECT "advertiserId", "id", "landingUrl", "payout", "title" FROM "Offer";
DROP TABLE "Offer";
ALTER TABLE "new_Offer" RENAME TO "Offer";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "id", "password", "role") SELECT "email", "id", "password", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Click_clickId_key" ON "Click"("clickId");
