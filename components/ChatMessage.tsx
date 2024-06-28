import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link } from "expo-router";
import * as ContextMenu from "zeego/context-menu";
import Markdown from "react-native-markdown-display";

import {
  copyImageToClipboard,
  downloadAndSaveImage,
  shareImage,
} from "@/utils/image";
import { Colors } from "@/constants";
import { Message, Role } from "@/types";

export default function ChatMessage({
  role,
  parts,
  imgUrl,
  prompt,
  loading,
}: Message) {
  const contextItems = [
    {
      title: "Copy",
      systemIcon: "doc.on.doc",
      action: () => copyImageToClipboard(imgUrl!),
    },
    {
      title: "Save to Photos",
      systemIcon: "arrow.down.to.line",
      action: () => downloadAndSaveImage(imgUrl!),
    },
    {
      title: "Share",
      systemIcon: "square.and.arrow.up",
      action: () => shareImage(imgUrl!),
    },
  ];

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

          {loading ? (
            <View style={styles.loading}>
              <ActivityIndicator size="small" color={Colors.primary} />
            </View>
          ) : (
            <>
              {parts[0].text === "" && imgUrl ? (
                <ContextMenu.Root>
                  <ContextMenu.Trigger>
                    <Link
                      href={`/(auth)/(modal)/${encodeURIComponent(
                        imgUrl
                      )}?prompt=${encodeURIComponent(prompt!)}`}
                      asChild
                    >
                      <Pressable>
                        <Image
                          source={{ uri: imgUrl }}
                          style={styles.previewImage}
                        />
                      </Pressable>
                    </Link>
                  </ContextMenu.Trigger>
                  <ContextMenu.Content
                    loop={true}
                    alignOffset={0}
                    avoidCollisions={true}
                    collisionPadding={0}
                  >
                    {contextItems.map((item, index) => (
                      <ContextMenu.Item
                        key={item.title}
                        {...item}
                        onSelect={item.action}
                      >
                        <ContextMenu.ItemTitle>
                          {item.title}
                        </ContextMenu.ItemTitle>
                        <ContextMenu.ItemIcon
                          ios={{
                            name: item.systemIcon,
                            pointSize: 18,
                          }}
                        />
                      </ContextMenu.Item>
                    ))}
                  </ContextMenu.Content>
                </ContextMenu.Root>
              ) : (
                <View
                  style={{
                    padding: 0,
                    flex: 1,
                    flexWrap: "wrap",
                  }}
                >
                  <Markdown>{parts[0].text}</Markdown>
                </View>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {loading ? (
            <View style={styles.loading}>
              <ActivityIndicator size="small" color={Colors.primary} />
            </View>
          ) : (
            <Text style={[styles.text, styles.userText]}>{parts[0].text}</Text>
          )}

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
    alignItems: "flex-start",
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
