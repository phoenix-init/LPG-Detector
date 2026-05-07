import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";
import { phoneNumberClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    plugins: [
        expoClient({
            scheme: "gas-sense",
            storagePrefix: "gas-sense",
            storage: SecureStore,
        }),
        phoneNumberClient()
    ]
});