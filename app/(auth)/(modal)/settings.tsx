import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { useMMKVString } from "react-native-mmkv";

import { storage } from "@/utils/storage";
import { Colors, defaultStyles } from "@/constants";

const Page = () => {
  const [key, setKey] = useMMKVString("apiKey", storage);
  const [repKey, setRepKey] = useMMKVString("replicateKey", storage);

  const router = useRouter();
  const { signOut } = useAuth();
  const [apiKey, setApiKey] = useState("");
  const [replicateKey, setReplicateKey] = useState("");

  const saveApiKey = async () => {
    setKey(apiKey);
    setRepKey(replicateKey);
    router.push("/(auth)/(drawer)/(chat)/new");
  };

  const removeApiKey = async () => {
    setKey("");
    setRepKey("");
  };

  return (
    <View style={styles.container}>
      {key && key !== "" && (
        <>
          <Text style={styles.label}>You are all set!</Text>
          <TouchableOpacity
            style={[defaultStyles.btn, { backgroundColor: Colors.primary }]}
            onPress={removeApiKey}
          >
            <Text style={styles.buttonText}>Remove API Key</Text>
          </TouchableOpacity>
        </>
      )}

      {(!key || key === "") && (
        <>
          <Text style={styles.label}>API Key:</Text>
          <TextInput
            style={styles.input}
            value={apiKey}
            onChangeText={setApiKey}
            placeholder="Enter your Gemini API key"
            autoCorrect={false}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            value={replicateKey}
            onChangeText={setReplicateKey}
            placeholder="Enter your Replicate API key"
            autoCorrect={false}
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={[defaultStyles.btn, { backgroundColor: Colors.primary }]}
            onPress={saveApiKey}
          >
            <Text style={styles.buttonText}>Save API Key</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        style={[
          defaultStyles.btn,
          { backgroundColor: Colors.dark, marginTop: 10 },
        ]}
        onPress={() => signOut()}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
export default Page;
