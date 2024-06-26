import { useState } from "react";
import { Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { View, Button } from "react-native";

import { defaultStyles } from "@/constants/Styles";
import HeaderDropDown from "@/components/HeaderDropDown";

export default function Page() {
  const { signOut } = useAuth();
  const [modelVersion, setModelVersion] = useState("1.5-flash");

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
      <Button title="Sign out" onPress={() => signOut()} />
    </View>
  );
}
