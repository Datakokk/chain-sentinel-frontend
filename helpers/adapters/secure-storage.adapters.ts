import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

export class SecureStorageAdapter {
  static async setItem(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      Alert.alert("Error", "Failed to save data to secure storage");
    }
  }

  static async getItem(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      Alert.alert("Error", "Failed to get data to secure storage");
      return null;
    }
  }

  static async deleteItem(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.log(Error);
      Alert.alert("Error", "Failed to delete data from secure storage");
    }
  }
}
