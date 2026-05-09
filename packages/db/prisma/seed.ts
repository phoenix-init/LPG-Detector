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

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });