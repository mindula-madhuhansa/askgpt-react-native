import {
  copyImageToClipboard,
  downloadAndSaveImage,
  shareImage,
} from "@/utils/image";
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

export const sections = [
  { title: "Top Picks", label: "Curated top picks from this week" },
  { title: "Draw·E", label: "Transform your ideas into amazing images" },
  {
    title: "Writing",
    label:
      "Enhance your writing with tools for creation, editing, and style refinement",
  },
  { title: "Productivity", label: "Increase your efficiency" },
  {
    title: "Research & Analysis",
    label: "Find, evaluate, interpret, and visualize information",
  },
  { title: "Programming", label: "Write code, debug, test, and learn" },
];

export const apps = [
  {
    title: "Instant Website [Multipage]",
    description:
      "Generates functional multipage websites aimed at meeting the needs of startups and small businesses. Continuously updated with new features.",
    author: "By Max & Kirill Dubovitsky",
    image:
      "https://files.oaiusercontent.com/file-9P4NhIxlr14rKlHEM41VVbxS?se=2124-03-21T08%3A51%3A45Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D1209600%2C%20immutable&rscd=attachment%3B%20filename%3Dsdfgasdfx.jpg&sig=8xHssdF2qgY0qpyaUNRn4My5tJwh9iYMn1Lg53H9Z1c%3D",
  },
  {
    title: "Diagrams & Data",
    description:
      "Helps research, analyze, and visualize complex data through diagrams and charts. Useful for coders and business analysts alike.",
    author: "By Max & Kirill Dubovitsky",
    image:
      "https://files.oaiusercontent.com/file-teufH6uVdqxmxHjEUIQjD8ur?se=2124-03-24T19%3A02%3A04Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D1209600%2C%20immutable&rscd=attachment%3B%20filename%3Dvar6.jpg&sig=wn6KyKdgbqJ1gGkHltYV8cl3/ZwLZmgO039GkueA8Z8%3D",
  },
  {
    title: "ChatPRD",
    description:
      "Acts as an on-demand Chief Product Officer, enhancing product requirement documents and providing coaching for product managers and engineers.",
    author: "By Claire V Lawless",
    image:
      "https://files.oaiusercontent.com/file-qeVpUG3AJT0FINT4eZ6Gbt2q?se=2123-10-17T23%3A41%3A20Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3Dcvolawless_illustration_of_a_female_ceo_at_a_laptop_lo-fi_asthe_c60ce7fb-5902-474c-aa85-54c7469aa089.png&sig=eHU4/LmvHg96KaqivlhaLufaIleMC1wm3pE0kMQF1AA%3D",
  },
  {
    title: "Music Teacher",
    description:
      "Specializes in music theory, scales, production, and more, also includes image generation capabilities for cover art.",
    author: "By gryphonedm.com",
    image:
      "https://files.oaiusercontent.com/file-gLZOuk6mmgg4vsCuhWxgQ2Cm?se=2123-12-13T21%3A57%3A04Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D1209600%2C%20immutable&rscd=attachment%3B%20filename%3D3e763913-0301-49ec-b2f0-c9ad832df862.png&sig=cCp02Ji5dcCxt0UPu92vrFgmZ8p1jwkqUYlYbR4IfoY%3D",
  },
  {
    title: "UX Design Mentor",
    description:
      "Provides specific feedback on UX or Product Design, enhancing the design process.",
    author: "By community builder",
    image:
      "https://files.oaiusercontent.com/file-Nz98JJBUj7rzXmJAyALeuV87?se=2123-10-16T04%3A49%3A04Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3D476c2153-1121-4e4c-ad3b-ea164ec21499.png&sig=8TkhKoq6xPQYcrXHiCzvp2SV0G9k3jMllTAy3fe30R8%3D",
  },
];
