import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { Link, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Colors from "@/constants/Colors";

export const CustomDrawerContent = (props: any) => {
  const { bottom, top } = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, marginTop: top }}>
      <View style={{ backgroundColor: "#fff", paddingBottom: 16 }}>
        <View style={styles.searchSection}>
          <Ionicons
            name="search"
            size={20}
            color={Colors.greyLight}
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search"
            underlineColorAndroid="transparent"
            style={styles.input}
          />
        </View>
      </View>
      <DrawerContentScrollView
        contentContainerStyle={{ paddingTop: 0 }}
        {...props}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={{ padding: 16, paddingBottom: bottom }}>
        <Link href="(auth)/(modal)/settings" asChild>
          <TouchableOpacity style={styles.footer}>
            <Image
              source={require("@/assets/images/me.png")}
              style={styles.avatar}
            />
            <Text style={styles.username}>Mindula Madhuhansa</Text>
            <Ionicons
              name="ellipsis-horizontal"
              size={24}
              color={Colors.greyLight}
            />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default function DrawerLayout() {
  const navigation = useNavigation();
  const dimensions = useWindowDimensions();

  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}
            style={{
              marginLeft: 16,
            }}
          >
            <FontAwesome6 name="grip-lines" size={20} color={Colors.grey} />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: Colors.light,
        },
        headerShadowVisible: false,
        drawerActiveBackgroundColor: Colors.selected,
        drawerActiveTintColor: "#000",
        drawerInactiveTintColor: "#000",
        drawerItemStyle: { borderRadius: 12 },
        drawerLabelStyle: { marginLeft: -20 },
        drawerStyle: { width: dimensions.width * 0.86 },
        overlayColor: "rgba(0, 0, 0, 0.2)",
      }}
    >
      <Drawer.Screen
        name="(chat)/new"
        getId={() => Math.random().toString()}
        options={{
          title: "AskGPT",
          drawerIcon: () => (
            <View style={[styles.item, { backgroundColor: "#fff" }]}>
              <Image
                source={require("@/assets/images/logo.png")}
                style={styles.btnImage}
              />
            </View>
          ),
          headerRight: () => (
            <Link href="/(auth)/(drawer)/(chat)/new" push asChild>
              <TouchableOpacity>
                <Ionicons
                  name="create-outline"
                  size={24}
                  color={Colors.grey}
                  style={{ marginRight: 16 }}
                />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />

      <Drawer.Screen
        name="drawe"
        options={{
          title: "Draw·E",
          drawerIcon: () => (
            <View style={[styles.item, { backgroundColor: "#fff" }]}>
              <Image
                source={require("@/assets/images/drawe.png")}
                style={styles.draweImage}
              />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="explore"
        options={{
          title: "Explore GPTs",
          drawerIcon: () => (
            <View style={styles.itemExplore}>
              <Ionicons name="apps-outline" size={16} color={"#000"} />
            </View>
          ),
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  item: {
    borderRadius: 15,
    overflow: "hidden",
  },
  itemExplore: {
    borderRadius: 15,
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  btnImage: {
    margin: 6,
    width: 16,
    height: 16,
  },
  draweImage: {
    margin: 6,
    width: 20,
    height: 20,
  },
  searchSection: {
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.input,
    borderRadius: 10,
    height: 34,
  },
  searchIcon: {
    padding: 6,
  },
  input: {
    flex: 1,
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 8,
    paddingLeft: 0,
    alignItems: "center",
    color: "#424242",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
});
