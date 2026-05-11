import { useEffect } from "react"
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import axios from "axios";
import { authClient } from "@/lib/auth-client";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true

    })
})

const usePushNotifications = (userId: string | undefined) => {
    const { data: session } = authClient.useSession();
    
    useEffect(() => {
        if(!userId) return;

        const registerForPushNotificationsAsync = async () => {
            if(!Device.isDevice) {
                console.log("Must use physical device for Push Notifications");
                return;
            }

            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if(finalStatus !== 'granted') {
                alert("Failed to get push token for push notification!")
                return;
            }

            if (Platform.OS === "android") {
                Notifications.setNotificationChannelAsync("default", {
                    name: "default",
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: "#FF231F7C"
                })
            }

            try {
                const projectId = "710c6ff0-5a5e-45dd-b32e-8802bb4edac6";
                const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
                console.log(token);

                const response = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/users/push-token`, {
                    headers: {
                        Authorization: `Bearer ${session?.session.token}`,
                        "Content-Type": "application/json",
                    },
                    data: {
                        token
                    }
                })
                
                console.log("Push token saved successfully", response.data);
                
            } catch (error) {
                console.error("Error registering push token", error);
            }
            
        }

        registerForPushNotificationsAsync();
    }, [userId, session])
}

export default usePushNotifications;
