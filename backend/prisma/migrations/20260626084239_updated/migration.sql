/*
  Warnings:

  - A unique constraint covering the columns `[account_no]` on the table `Beneficiary` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Beneficiary_account_no_key" ON "Beneficiary"("account_no");
