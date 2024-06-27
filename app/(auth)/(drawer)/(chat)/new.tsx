import { useState } from "react";
import { Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import {
  View,
  Button,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { defaultStyles } from "@/constants/Styles";
import HeaderDropDown from "@/components/HeaderDropDown";
import MessageInput from "@/components/MessageInput";

export default function Page() {
  const { signOut } = useAuth();
  const [modelVersion, setModelVersion] = useState("1.5-flash");

  const getCompletion = async (message: string) => {
    console.log("Message: ", message);
  };

  return (
    <View style={defaultStyles.pageContainer}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <HeaderDropDown
              title="AskGPT"
              items={[
                { key: "1.0-pro", title: "Gemini 1.0 Pro", icon: "bolt" },
                {
                  key: "1.5-flash",
                  title: "Gemini 1.5 Flash",
                  icon: "star",
                },
                { key: "1.5-pro", title: "Gemini 1.5 Pro", icon: "sparkles" },
              ]}
              onSelect={(key) => setModelVersion(key)}
              selected={modelVersion}
            />
          ),
        }}
      />

      <View style={{ flex: 1 }}>
        <Text>Page</Text>
        <Button title="Sign out" onPress={() => signOut()} />
      </View>
      <KeyboardAvoidingView
        keyboardVerticalOffset={70}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
        }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <MessageInput onShouldSendMessage={getCompletion} />
      </KeyboardAvoidingView>
    </View>
  );
}
