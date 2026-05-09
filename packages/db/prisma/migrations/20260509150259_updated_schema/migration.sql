/*
  Warnings:

  - You are about to drop the column `gasLevel` on the `sensor_readings` table. All the data in the column will be lost.
  - Added the required column `powerSource` to the `sensor_readings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "iot_devices" ADD COLUMN     "maintenanceStatus" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "valveOpen" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "sensor_readings" DROP COLUMN "gasLevel",
ADD COLUMN     "powerSource" TEXT NOT NULL,
ALTER COLUMN "isLeaking" SET DEFAULT false;
