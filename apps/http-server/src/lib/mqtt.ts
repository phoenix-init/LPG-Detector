import { prisma } from "@repo/db";
import mqtt from "mqtt";
// import { Expo } from "expo-server-sdk"; 

export const mqttClient = mqtt.connect("mqtt://broker.hivemq.com:1883"); 
// const expo = new Expo(); 

// In-memory store to prevent spamming notifications for the same device
const lastNotificationTimes = new Map<string, number>();
const NOTIFICATION_COOLDOWN_MS = 60 * 1000; // 1 minute cooldown

const deviceLastState = new Map<string, string>();

export const setupMqtt = () => {
  mqttClient.on("connect", () => {
    console.log("Connected to HiveMQ Broker!");
    mqttClient.subscribe("gasSystem/status");
  });

  mqttClient.on("message", async (topic, message) => {
    if (topic === "gasSystem/status") {
      const data = JSON.parse(message.toString());
      const deviceId = "ESP32-HARDCODED-ID";

      const currentStateStr = JSON.stringify({
        leak: data.leak,
        valveOpen: data.valveOpen,
        maintenanceStatus: data.maintenanceStatus,
        powerSource: data.powerSource,
        isConnected: data.isConnected
      });

      if (deviceLastState.get(deviceId) === currentStateStr) return;


      deviceLastState.set(deviceId, currentStateStr);

      console.log("New state detected, updating database:", data);
      
      const isLeaking = data.leak === true || data.leak === "true";       
      const valveOpen = data.valveOpen === true || data.valveOpen === "true";
      const maintenanceStatus = data.maintenanceStatus === true || data.maintenanceStatus === "true";
      const powerSource = data.powerSource || "MAINS";
      const isConnected = data.isConnected === true || data.isConnected === "true";

      try {
        await prisma.ioTDevice.update({
          where: { serialNumber: "ESP32-HARDCODED-ID" },
          data: {
            valveOpen,
            maintenanceStatus,
            powerSource: powerSource.toUpperCase(),
            isOnline: isConnected,
          }
        });

        const updateResult = await prisma.sensorReading.updateMany({
          where: {
            device: { serialNumber: "ESP32-HARDCODED-ID" }
          },
          data: {
            isLeaking,
            timestamp: new Date()
          }
        });

        if (updateResult.count === 0) {
          await prisma.sensorReading.create({
            data: {
              device: {
                connect: { serialNumber: "ESP32-HARDCODED-ID" }
              },
              isLeaking,
              timestamp: new Date()
            }
          });
        }
        

        if (isLeaking) {
          console.log("CRITICAL: Gas leak detected! Checking if we should trigger aleyrt...");

          const deviceId = "ESP32-HARDCODED-ID";
          const lastSent = lastNotificationTimes.get(deviceId) || 0;
          const now = Date.now();

          if (now - lastSent > NOTIFICATION_COOLDOWN_MS) {

            await prisma.ioTDevice.update({
              where: { serialNumber: deviceId },
              data: {
                consecutiveLeakCount: { increment: 1 }
              }
            });

            lastNotificationTimes.set(deviceId, now);

            // const targetDevice = await prisma.ioTDevice.findUnique({
            //   where: { serialNumber: deviceId },
            //   include: {
            //     users: {
            //       include: { user: true }
            //     }
            //   }
            // });

            // if (targetDevice && targetDevice.users.length > 0) {
            //   let messages: import("expo-server-sdk").ExpoPushMessage[] = [];

            //   for (let access of targetDevice.users) {
            //     const pushToken = access.user.expoPushToken;

            //     if (pushToken && Expo.isExpoPushToken(pushToken)) {
            //       messages.push({
            //         to: pushToken,
            //         sound: 'default',
            //         priority: 'high',
            //         title: '🚨 DANGER: GAS LEAK DETECTED 🚨',
            //         body: `Critical gas levels detected at ${targetDevice.name}. Evacuate immediately!`,
            //         data: { serialNumber: deviceId },
            //       });
            //     }
            //   }

            //   // Blast the notifications via Expo
            //   if (messages.length > 0) {
            //     const chunks = expo.chunkPushNotifications(messages);
            //     for (let chunk of chunks) {
            //       await expo.sendPushNotificationsAsync(chunk);
            //     }
            //     console.log(`📲 Fired push notifications to ${messages.length} connected user(s)!`);
                
            //     // Update the last sent time to start the cooldown
            //     lastNotificationTimes.set(deviceId, now);
            //   } else {
            //     console.log("No valid Expo Push Tokens found for the connected users.");
            //   }
            // } else {
            //   console.log("No users are currently assigned to this device.");
            // }
          } else {
            console.log("Push notification skipped: Cooldown active.");
          }
        }
        
      } catch (error) {
        console.error("Failed to process MQTT reading:", error);
      }
    }
  });
};