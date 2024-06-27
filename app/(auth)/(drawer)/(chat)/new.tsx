import {
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
} from "react-native";
import { useState } from "react";
import { Redirect, Stack } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { useMMKVString } from "react-native-mmkv";

import { Message } from "@/types";
import { storage } from "@/utils/storage";
import { defaultStyles } from "@/constants";
import ChatMessage from "@/components/ChatMessage";
import MessageInput from "@/components/MessageInput";
import MessageIdeas from "@/components/MessageIdeas";
import HeaderDropDown from "@/components/HeaderDropDown";

export default function Page() {
  const [height, setHeight] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);

  const [key, setKey] = useMMKVString("apiKey", storage);
  const [modelVersion, setModelVersion] = useMMKVString(
    "modelVersion",
    storage
  );

  if (!key || key === "") {
    return <Redirect href={"/(auth)/(modal)/settings"} />;
  }

  const getCompletion = async (message: string) => {
    console.log("Message: ", message);
  };

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height);
  };

  return (
    <View style={defaultStyles.pageContainer}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <HeaderDropDown
              title="AskGPT"
              items={[
                {
                  key: "gemini-1.0-pro",
                  title: "Gemini 1.0 Pro",
                  icon: "bolt",
                },
                {
                  key: "gemini-1.5-flash",
                  title: "Gemini 1.5 Flash",
                  icon: "star",
                },
                {
                  key: "gemini-1.5-pro",
                  title: "Gemini 1.5 Pro",
                  icon: "sparkles",
                },
              ]}
              onSelect={(key) => setModelVersion(key)}
              selected={modelVersion}
            />
          ),
        }}
      />

      <View style={{ flex: 1 }} onLayout={onLayout}>
        {messages.length === 0 && (
          <View style={[styles.logoContainer, { marginTop: height / 2 - 100 }]}>
            <Image
              source={require("@/assets/images/logo.png")}
              alt="Logo"
              style={styles.image}
            />
          </View>
        )}

        <FlashList
          data={messages}
          renderItem={({ item }) => <ChatMessage {...item} />}
          estimatedItemSize={400}
          keyExtractor={(item, index) => `${index}_${index.toString()}`}
          contentContainerStyle={{ paddingTop: 30, paddingBottom: 150 }}
          keyboardDismissMode="on-drag"
        />
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
        {messages.length === 0 && <MessageIdeas onSelectCard={getCompletion} />}

        <MessageInput onShouldSendMessage={getCompletion} />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: 50,
    height: 50,
    backgroundColor: "#00000010",
  },
  image: {
    width: 36,
    height: 36,
  },
});
