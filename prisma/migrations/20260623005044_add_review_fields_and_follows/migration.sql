/*
  Warnings:

  - Added the required column `albumId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileImg` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "albumId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "likes" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "profileImg" TEXT NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Follows" (
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,

    CONSTRAINT "Follows_pkey" PRIMARY KEY ("followerId","followingId")
);
