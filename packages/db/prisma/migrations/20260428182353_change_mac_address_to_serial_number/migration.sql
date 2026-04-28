/*
  Warnings:

  - You are about to drop the column `macAddress` on the `iot_devices` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[serialNumber]` on the table `iot_devices` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `serialNumber` to the `iot_devices` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "iot_devices_macAddress_key";

-- AlterTable
ALTER TABLE "iot_devices" DROP COLUMN "macAddress",
ADD COLUMN     "serialNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "iot_devices_serialNumber_key" ON "iot_devices"("serialNumber");
