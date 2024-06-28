import { StyleSheet } from "react-native";

export const POLLING_INTERVAL = 1000;

export const Colors = {
  primary: "#20AB6E",
  lime: "#D7FFD4",
  pink: "#F655FF",
  brown: "#29271D",
  sky: "#E5EDFF",
  teal: "#0E4D45",
  yellow: "#FCBB80",
  orange: "#EF580B",
  blue: "#0000FA",
  green: "#172E15",
  light: "#FFFCFF",
  grey: "#242026",
  greyLight: "#B8B3BA",
  input: "#EEE9F0",
  selected: "#F7F2F9",
  dark: "#2F2D32",
};

export const content = [
  {
    title: "Let's create.",
    bg: Colors.lime,
    fontColor: Colors.pink,
  },
  {
    title: "Let's brainstorm.",
    bg: Colors.brown,
    fontColor: Colors.sky,
  },
  {
    title: "Let's discover.",
    bg: Colors.orange,
    fontColor: Colors.blue,
  },
  {
    title: "Let's go.",
    bg: Colors.teal,
    fontColor: Colors.yellow,
  },
  {
    title: "AskGPT.",
    bg: Colors.green,
    fontColor: Colors.pink,
  },
];

export const predefinedMessages = [
  { title: "Explain React Native", text: "like I'm five years old" },
  {
    title: "Suggest fun activites",
    text: "for a family visting Sri Lanka",
  },
  { title: "Recommend a dish", text: "to impress a date who's a picky eater" },
];

export const defaultStyles = StyleSheet.create({
  btn: {
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  pageContainer: {
    flex: 1,
    backgroundColor: Colors.light,
  },
});
