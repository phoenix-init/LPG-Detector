import { prisma } from "@lib/prisma";


async function main() {
  console.log('🌱 Starting database seeding...');

  // Array of 10 realistic dummy devices
  const dummyDevices = [
    {
      name: 'Kitchen Main Sensor',
      serialNumber: 'ESP32-HARDCODED-ID', 
      isOnline: true,
      valveOpen: false,
      maintenanceStatus: false,
      powerSource: 'MAINS',
      consecutiveLeakCount: 0,
    },
    {
      name: 'Basement Cylinder Storage',
      serialNumber: 'ESP32-BSMT-8821',
      isOnline: true,
      valveOpen: false,
      maintenanceStatus: false,
      powerSource: 'MAINS',
      consecutiveLeakCount: 0,
    },
    {
      name: 'Outdoor Grill Line',
      serialNumber: 'ESP32-OUT-9910',
      isOnline: false, 
      valveOpen: false,
      maintenanceStatus: false,
      powerSource: 'BATTERY',
      consecutiveLeakCount: 0,
    },
    {
      name: 'Garage Heater',
      serialNumber: 'ESP32-GRG-3345',
      isOnline: true,
      valveOpen: true, 
      maintenanceStatus: false,
      powerSource: 'MAINS',
      consecutiveLeakCount: 0,
    },
    {
      name: 'RV Propane Tank',
      serialNumber: 'ESP32-RV-5522',
      isOnline: true,
      valveOpen: false,
      maintenanceStatus: false,
      powerSource: 'BATTERY', 
      consecutiveLeakCount: 0,
    },
    {
      name: 'Guest House Kitchen',
      serialNumber: 'ESP32-GST-1109',
      isOnline: true,
      valveOpen: false,
      maintenanceStatus: true, 
      powerSource: 'MAINS',
      consecutiveLeakCount: 0,
    },
    {
      name: 'Industrial Oven 1',
      serialNumber: 'ESP32-IND-001',
      isOnline: false,
      valveOpen: false,
      maintenanceStatus: true,
      powerSource: 'MAINS',
      consecutiveLeakCount: 0,
    },
    {
      name: 'Backup Generator Line',
      serialNumber: 'ESP32-GEN-4433',
      isOnline: true,
      valveOpen: false,
      maintenanceStatus: false,
      powerSource: 'BATTERY',
      consecutiveLeakCount: 0,
    },
    {
      name: 'Cafeteria Main Line',
      serialNumber: 'ESP32-CAF-7766',
      isOnline: true,
      valveOpen: false,
      maintenanceStatus: false,
      powerSource: 'MAINS',
      consecutiveLeakCount: 2, // Show a device that has had recent warnings
    },
    {
      name: 'Warehouse Storage A',
      serialNumber: 'ESP32-WRH-2299',
      isOnline: true,
      valveOpen: false,
      maintenanceStatus: false,
      powerSource: 'MAINS',
      consecutiveLeakCount: 0,
    }
  ];

  console.log(`Injecting ${dummyDevices.length} devices into the matrix...`);

  // Loop through and upsert each one
  for (const device of dummyDevices) {
    await prisma.ioTDevice.upsert({
      where: { serialNumber: device.serialNumber },
      update: {}, // If it already exists, leave it alone so we don't overwrite real data
      create: device,
    });
  }

  console.log('✅ Seeding complete! Your dashboard is going to look awesome.');
}

async function deviceAccess() {
  console.log('🌱 Starting relation and history seeding...');

  const targetUserId = 'fTEE7GfdT1QMoRgBbZitFnRDFG7TwXeU';

  const allDevices = await prisma.ioTDevice.findMany();

  if (allDevices.length === 0) {
    console.error('❌ No devices found! Please seed devices first.');
    return;
  }
  const myDevices = allDevices.slice(0, 3);

  for (const device of myDevices) {
    await prisma.deviceAccess.upsert({
      where: {
        // This targets the @@unique([userId, deviceId]) constraint in your schema
        userId_deviceId: {
          userId: targetUserId,
          deviceId: device.id,
        },
      },
      update: {}, // Leave it alone if it's already linked
      create: {
        userId: targetUserId,
        deviceId: device.id,
        role: 'OWNER',
      },
    });
    console.log(`🔗 Linked device: ${device.name} to your account`);

    // 4. Generate historical data so your app's history/logs aren't empty
    // We will simulate 12 readings over the past 24 hours (1 every 2 hours)
    const readingsToInsert = [];
    const now = new Date();

    for (let i = 0; i < 12; i++) {
      // Subtract hours to go back in time
      const pastDate = new Date(now.getTime() - i * 2 * 60 * 60 * 1000); 

      // MAGIC TOUCH: Let's artificially create a "Leak Event" that happened 
      // 6 hours ago on your Main Sensor just to prove your UI can show history!
      const isLeakingEvent = i === 3 && device.name.includes("Main");

      readingsToInsert.push({
        deviceId: device.id,
        isLeaking: isLeakingEvent,
        timestamp: pastDate,
      });
    }

    // Insert the batch of history into the database
    await prisma.sensorReading.createMany({
      data: readingsToInsert,
    });
    console.log(`📊 Generated 24-hour history log for ${device.name}`);
  }

  console.log('🎉 Seeding complete! Log into Expo and check your dashboard.');
}

deviceAccess()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });