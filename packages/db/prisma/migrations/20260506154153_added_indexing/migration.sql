-- CreateIndex
CREATE INDEX "device_accesses_deviceId_idx" ON "device_accesses"("deviceId");

-- CreateIndex
CREATE INDEX "sensor_readings_deviceId_timestamp_idx" ON "sensor_readings"("deviceId", "timestamp" DESC);
