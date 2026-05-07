import { router } from "expo-router";
import { authClient } from "@/lib/auth-client";
import axios from "axios";

const COUNTRY_CODE = "+91";

export const formatPhone = (phone: string) =>
  `${COUNTRY_CODE}${phone.trim()}`;

export type AuthResult = { error: string | null };


export async function checkPhoneExists(phone: string): Promise<{ exists: boolean; error: string | null }> {
  try {
    const formattedPhone = formatPhone(phone);
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    
    const encodedPhone = encodeURIComponent(formattedPhone);
    
    const response = await axios.get(`${apiUrl}/api/verify-phone/${encodedPhone}`, {
      validateStatus: (status) => status < 500
    });
    
    const data = response.data;

    if (response.status === 200) {
      return { exists: true, error: null };
    }
    
    if (response.status === 404) {
      return { exists: false, error: null };
    }

    return { exists: false, error: data.message || "Failed to verify phone number" };
  } catch (error: any) {
    return { exists: false, error: error.message || "Network error while checking phone number" };
  }
}

export async function sendOtp(phone: string): Promise<AuthResult> {
  const { error } = await authClient.phoneNumber.sendOtp({
    phoneNumber: formatPhone(phone),
  });

  if (error) {
    return { error: error.message || "Failed to send OTP." };
  }

  return { error: null };
}

export async function verifyOtp(
  phone: string,
  code: string,
  name?: string
): Promise<AuthResult> {
  const { error } = await authClient.phoneNumber.verify({
    phoneNumber: formatPhone(phone),
    code: code.trim()
  });

  if (error) {
    return { error: error.message || "Invalid OTP. Please check the code sent to your phone." };
  }

  if (name) {
    console.log(name);
    
    const { error: updateError } = await authClient.updateUser({
      name
    });
    console.log(updateError);

    if (updateError) {
      console.error("Failed to update user name:", updateError);
      return { error: "Account created, but failed to save name. " + updateError.message };
    }
  }

  router.replace("/(tabs)");
  return { error: null };
}

export async function signInWithGoogle(): Promise<AuthResult> {
  try {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/(tabs)",
    });

    if (error) {
      return { error: error.message || "Google sign-in failed." };
    }

    if (data) {
      router.replace("/(tabs)");
    }

    return { error: null };
  } catch (e: any) {
    return { error: e.message || "Failed to connect to authentication server." };
  }
}
