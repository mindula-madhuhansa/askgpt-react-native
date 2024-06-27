import { useState } from "react";
import { Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
} from "react-native";

import { Message, Role } from "@/types";
import { defaultStyles } from "@/constants";
import HeaderDropDown from "@/components/HeaderDropDown";
import MessageInput from "@/components/MessageInput";
import MessageIdeas from "@/components/MessageIdeas";
import { FlashList } from "@shopify/flash-list";
import ChatMessage from "@/components/ChatMessage";

const DUMMY_MESSAGES: Message[] = [
  {
    role: Role.Bot,
    content: "Hello, how can I help you today?",
  },
  {
    role: Role.User,
    content: "I'm having trouble with my account.",
  },
  {
    role: Role.Bot,
    content: "I'm sorry to hear that. What seems to be the problem?",
  },
  {
    role: Role.User,
    content: "I can't log in.",
  },
  {
    role: Role.Bot,
    content: "Have you tried resetting your password?",
  },
  {
    role: Role.User,
    content: "Yes, but it's still not working.",
  },
  {
    role: Role.Bot,
    content: "I can help you with that. What's your email address?",
  },
  {
    role: Role.User,
    content: " [email protected]",
  },
  {
    role: Role.Bot,
    content: "I've sent you an email with a link to reset your password.",
  },
  {
    role: Role.User,
    content: "Thank you!",
  },
  {
    role: Role.Bot,
    content: "You're welcome. Is there anything else I can help you with?",
  },
  {
    role: Role.User,
    content: "No, that's all. Thanks again!",
  },
];

export default function Page() {
  const { signOut } = useAuth();
  const [height, setHeight] = useState(0);
  const [messages, setMessages] = useState<Message[]>(DUMMY_MESSAGES);
  const [modelVersion, setModelVersion] = useState("1.5-flash");

  const getCompletion = async (message: string) => {
    console.log("Message: ", message);
  };

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    console.log("Height: ", height);
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
