import { Image, StyleSheet, Text, View } from "react-native";

import { Message, Role } from "@/types";

export default function ChatMessage({
  role,
  content,
  imageUrl,
  prompt,
}: Message) {
  return (
    <View
      style={[styles.row, role === Role.Bot ? styles.botRow : styles.userRow]}
    >
      {role === Role.Bot ? (
        <>
          <View style={[styles.item, { backgroundColor: "#000" }]}>
            <Image
              source={require("@/assets/images/logo-white.png")}
              style={styles.btnImage}
            />
          </View>
          <Text style={[styles.text, styles.botText]}>{content}</Text>
        </>
      ) : (
        <>
          <Text style={[styles.text, styles.userText]}>{content}</Text>
          <Image
            source={require("@/assets/images/me.png")}
            style={styles.avatar}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 14,
    marginVertical: 12,
  },
  botRow: {
    justifyContent: "flex-start",
  },
  userRow: {
    justifyContent: "flex-end",
  },
  item: {
    borderRadius: 15,
    overflow: "hidden",
  },
  btnImage: {
    margin: 6,
    width: 16,
    height: 16,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#000",
  },
  text: {
    padding: 4,
    fontSize: 16,
    flexWrap: "wrap",
    flex: 1,
  },
  botText: {
    textAlign: "left",
  },
  userText: {
    textAlign: "right",
  },
  previewImage: {
    width: 240,
    height: 240,
    borderRadius: 10,
  },
  loading: {
    justifyContent: "center",
    height: 26,
    marginLeft: 14,
  },
});
