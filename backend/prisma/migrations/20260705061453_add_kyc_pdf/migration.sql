/*
  Warnings:

  - Added the required column `doc_url` to the `Kyc` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Kyc" ADD COLUMN     "doc_url" TEXT NOT NULL;
