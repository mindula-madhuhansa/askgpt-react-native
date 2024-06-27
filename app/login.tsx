import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";

import { defaultStyles, Colors } from "@/constants";

export default function Page() {
  const { type } = useLocalSearchParams<{ type: "login" | "register" }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const {
    signIn,
    isLoaded: signInIsLoaded,
    setActive: signInSetActive,
  } = useSignIn();
  const {
    signUp,
    isLoaded: signUpIsLoaded,
    setActive: signUpSetActive,
  } = useSignUp();

  const onSignUpPress = async () => {
    if (!signUpIsLoaded) return;
    setLoading(true);

    try {
      const result = await signUp.create({ emailAddress, password });

      signUpSetActive({
        session: result.createdSessionId,
      });
    } catch (error: any) {
      Alert.alert(error.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const onLoginPress = async () => {
    if (!signInIsLoaded) return;
    setLoading(true);

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      signInSetActive({
        session: result.createdSessionId,
      });
    } catch (error: any) {
      Alert.alert(error.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      keyboardVerticalOffset={1}
      style={styles.container}
    >
      {loading && (
        <View style={defaultStyles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      <Image source={require("@/assets/images/logo.png")} style={styles.logo} />

      <Text style={styles.title}>
        {type === "register" ? "Create an Account" : "Welcome back!"}
      </Text>

      <View style={{ marginBottom: 30 }}>
        <TextInput
          autoCapitalize="none"
          placeholder="Email"
          value={emailAddress}
          onChangeText={setEmailAddress}
          style={styles.inputField}
        />
        <TextInput
          secureTextEntry
          autoCapitalize="none"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.inputField}
        />
      </View>

      {type === "login" ? (
        <TouchableOpacity
          onPress={onLoginPress}
          style={[defaultStyles.btn, styles.btnPrimary]}
        >
          <Text style={styles.btnPrimaryText}>Log in</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={onSignUpPress}
          style={[defaultStyles.btn, styles.btnPrimary]}
        >
          <Text style={styles.btnPrimaryText}>Sign up</Text>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 60,
    height: 60,
    alignSelf: "center",
    marginVertical: 80,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#fff",
  },
  btnPrimary: {
    backgroundColor: Colors.primary,
    marginVertical: 4,
  },
  btnPrimaryText: {
    color: "#fff",
    fontSize: 16,
  },
});
