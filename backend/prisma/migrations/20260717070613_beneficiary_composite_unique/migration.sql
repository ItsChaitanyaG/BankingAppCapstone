/*
  Warnings:

  - A unique constraint covering the columns `[owner_acc_id,account_no]` on the table `Beneficiary` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Beneficiary_account_no_key";

-- CreateIndex
CREATE UNIQUE INDEX "Beneficiary_owner_acc_id_account_no_key" ON "Beneficiary"("owner_acc_id", "account_no");
