import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { MessageIdeasProps } from "@/types";
import { Colors, predefinedMessages } from "@/constants";

export default function MessageIdeas({ onSelectCard }: MessageIdeasProps) {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: 16,
          paddingVertical: 10,
        }}
      >
        {predefinedMessages.map((message, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => onSelectCard(`${message.title} ${message.text}`)}
            style={styles.card}
          >
            <Text style={{ fontSize: 16, fontWeight: 500 }}>
              {message.title}
            </Text>
            <Text style={{ fontSize: 14, color: Colors.grey }}>
              {message.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.input,
    padding: 14,
    borderRadius: 10,
  },
});
