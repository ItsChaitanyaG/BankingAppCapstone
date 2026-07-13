/*
  Warnings:

  - You are about to drop the column `beneficiary_acc_id` on the `Beneficiary` table. All the data in the column will be lost.
  - You are about to drop the `KYC` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `acc_type` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_no` to the `Beneficiary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bank_name` to the `Beneficiary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Beneficiary` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ACCTYPE" AS ENUM ('SAVINGS', 'CURRENT');

-- DropForeignKey
ALTER TABLE "Beneficiary" DROP CONSTRAINT "Beneficiary_beneficiary_acc_id_fkey";

-- DropForeignKey
ALTER TABLE "KYC" DROP CONSTRAINT "KYC_user_id_fkey";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "acc_type" "ACCTYPE" NOT NULL;

-- AlterTable
ALTER TABLE "Beneficiary" DROP COLUMN "beneficiary_acc_id",
ADD COLUMN     "account_no" TEXT NOT NULL,
ADD COLUMN     "bank_name" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "KYC";

-- CreateTable
CREATE TABLE "Kyc" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "doc_type" "DOCTYPE" NOT NULL,
    "doc_no" TEXT NOT NULL,
    "status" "KYC_STATUS" NOT NULL DEFAULT 'PENDING',
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kyc_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Kyc_user_id_key" ON "Kyc"("user_id");

-- AddForeignKey
ALTER TABLE "Kyc" ADD CONSTRAINT "Kyc_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
