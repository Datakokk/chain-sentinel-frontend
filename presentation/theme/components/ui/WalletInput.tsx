import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { Text, Button, Snackbar } from "react-native-paper";
import { updateWalletAddress } from "@/core/auth/actions/updateWallet";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/core/auth/firebaseConfig";

const WalletInput = ({ onWalletSaved }: { onWalletSaved: () => void }) => {
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { user, token } = useAuthStore();

  if (!user) return null;
  if (user.wallet_address) return null;

  const handleSubmit = async () => {
    setLoading(true);
    const success = await updateWalletAddress(user.id, wallet);
    setLoading(false);

    if (success) {
      // 🔄 Refrescar el usuario desde Firestore
      const userRef = doc(db, "users", user.id);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const updatedUser = { ...user, ...userSnap.data() };
        useAuthStore.getState().changeStatus(token, updatedUser);
      }

      onWalletSaved(); // Llamar al callback para notificar que se guardó la wallet
      setVisible(true);
    } else {
      alert("Error al guardar wallet");
    }
  };

  return (
    <View>
      <Text style={{ color: "#00bfa5", fontSize: 17, marginBottom: 5 }}>
        Introduce tu wallet:
      </Text>
      <TextInput
        placeholder="0x..."
        value={wallet}
        onChangeText={setWallet}
        autoCapitalize="none"
        style={{
          borderColor: "gray",
          borderWidth: 1,
          marginVertical: 10,
          padding: 8,
          color: "#fff",
        }}
      />
      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={loading}
        style={{
          backgroundColor: "#a259ff",
          marginTop: 10,
        }}
        labelStyle={{
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        Guardar
      </Button>

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={3000}
        style={{ backgroundColor: "#00bfa5", marginTop: 10 }}
      >
        Wallet guardada correctamente
      </Snackbar>
    </View>
  );
};

export default WalletInput;
