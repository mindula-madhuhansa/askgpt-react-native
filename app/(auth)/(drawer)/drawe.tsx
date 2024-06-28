import {
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
  Text,
} from "react-native";
import { useState } from "react";
import { Redirect, Stack } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { useMMKVString } from "react-native-mmkv";

import { Message, Role } from "@/types";
import { storage } from "@/utils/storage";
import { Colors, defaultStyles } from "@/constants";

import ChatMessage from "@/components/ChatMessage";
import MessageInput from "@/components/MessageInput";
import HeaderDropDown from "@/components/HeaderDropDown";
import { generateImage } from "@/utils/generateImage";

export default function Page() {
  const [height, setHeight] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [working, setWorking] = useState<boolean>(false);

  const [key, setKey] = useMMKVString("replicateKey", storage);

  if (!key || key === "") {
    return <Redirect href={"/(auth)/(modal)/settings"} />;
  }

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height);
  };

  const getImageGeneration = async (message: string) => {
    setWorking(true);

    if (message.length === 0) {
      // TODO: Create chat later, store to DB
      return;
    }

    setMessages([
      ...messages,
      {
        role: Role.User,
        parts: [{ text: message }],
      },
    ]);

    try {
      await generateImage(key, message, (imgUrl) => setImgUrl(imgUrl));
    } catch (error) {
      console.error("Failed to generate image:", error);
    }

    if (imgUrl) {
      setMessages((prevMsgs) => [
        ...prevMsgs,
        {
          role: Role.Bot,
          parts: [{ text: "" }],
          imgUrl: imgUrl,
          prompt: message,
          loading: false,
        },
      ]);
    }
    setWorking(false);
  };

  return (
    <View style={defaultStyles.pageContainer}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <HeaderDropDown
              title="Draw·E"
              onSelect={() => {}}
              items={[
                {
                  key: "share",
                  title: "Share GPT",
                  icon: "square.and.arrow.up",
                },
                { key: "details", title: "See Details", icon: "info.circle" },
                { key: "keep", title: "Keep in Sidebar", icon: "pin" },
              ]}
            />
          ),
        }}
      />

      <View style={{ flex: 1 }} onLayout={onLayout}>
        {messages.length === 0 && (
          <View
            style={[
              { marginTop: height / 2 - 100, alignItems: "center", gap: 16 },
            ]}
          >
            <View style={[styles.logoContainer]}>
              <Image
                source={require("@/assets/images/drawe.png")}
                alt="Logo"
                style={styles.image}
              />
            </View>
            <Text style={styles.label}>
              Let me turn your imagination into imagery.
            </Text>
          </View>
        )}

        <FlashList
          data={messages}
          renderItem={({ item }) => <ChatMessage {...item} />}
          estimatedItemSize={400}
          keyExtractor={(item, index) => `${index}_${index.toString()}`}
          contentContainerStyle={{ paddingTop: 30, paddingBottom: 150 }}
          keyboardDismissMode="on-drag"
          ListFooterComponent={
            <>
              {working && (
                <ChatMessage
                  {...{ role: Role.Bot, parts: [{ text: "" }], loading: true }}
                />
              )}
            </>
          }
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
        <MessageInput onShouldSendMessage={getImageGeneration} />
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
    width: 64,
    height: 64,
  },
  label: {
    color: Colors.grey,
    fontSize: 16,
  },
});
