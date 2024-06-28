import { Colors } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function AuthLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modal)/settings"
        options={{
          headerTitle: "Settings",
          presentation: "modal",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.selected },
          headerLeft: () => null,
          headerRight: () => (
            <>
              {router.canGoBack() && (
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name="close" size={24} color={Colors.grey} />
                </TouchableOpacity>
              )}
            </>
          ),
        }}
      />
      <Stack.Screen
        name="(modal)/[url]"
        options={{
          headerTitle: "",
          presentation: "fullScreenModal",
          headerTransparent: true,
          headerShadowVisible: false,
          headerBlurEffect: "dark",
          headerStyle: { backgroundColor: "rgba(0,0,0,0.4)" },
          headerLeft: () => (
            <>
              {router.canGoBack() && (
                <TouchableOpacity onPress={() => router.back()}>
                  <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>
              )}
            </>
          ),
        }}
      />
    </Stack>
  );
}
