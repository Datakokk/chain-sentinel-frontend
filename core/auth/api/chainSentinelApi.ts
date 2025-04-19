import { SecureStorageAdapter } from "@/helpers/adapters/secure-storage.adapters";
import axios from "axios";
import { Platform } from "react-native";

// ToDO conect thougt envs vars, Android, iOS
const STAGE = process.env.EXPO_PUBLIC_STAGE || "dev";

export const API_URL =
  STAGE === "prod"
    ? process.env.EXPO_PUBLIC_API_URL
    : Platform.OS === "ios"
    ? process.env.EXPO_PUBLIC_API_URL_IOS
    : process.env.EXPO_PUBLIC_API_URL_ANDROID;

const chainSentinelApi = axios.create({
  baseURL: API_URL,
});

// Interceptor to add the token to the request
chainSentinelApi.interceptors.request.use(
  async (config) => {
    // Verify if  we havea a token in the secure storage
    const token = await SecureStorageAdapter.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);
export { chainSentinelApi };
