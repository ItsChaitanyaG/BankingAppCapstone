-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_receiver_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_sender_id_fkey";

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "sender_id" DROP NOT NULL,
ALTER COLUMN "receiver_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
