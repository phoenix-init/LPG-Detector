/*
  Warnings:

  - You are about to drop the column `powerSource` on the `sensor_readings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "iot_devices" ADD COLUMN     "powerSource" TEXT NOT NULL DEFAULT 'MAINS';

-- AlterTable
ALTER TABLE "sensor_readings" DROP COLUMN "powerSource";
