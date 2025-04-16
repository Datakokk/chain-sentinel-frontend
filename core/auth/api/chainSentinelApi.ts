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

console.log({ STAGE, [Platform.OS]: API_URL });

const chainSentinelApi = axios.create({
  baseURL: API_URL,
});

// TODO interceptors

export { chainSentinelApi };
