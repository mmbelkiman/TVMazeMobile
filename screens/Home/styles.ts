import { StyleSheet } from "react-native";

export default StyleSheet.create({
  contentContainer: {
    alignItems: "center",
    paddingBottom: 300,
  },

  container: {
    flex: 1,
    backgroundColor: "#272042",
  },

  itemContainer: {
    marginBottom: 14,
  },

  image: {
    borderRadius: 14,
    width: 300,
    height: 300,
  },

  textItemTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 28,
  },

  textItemDescription: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 18,
  },

  itemIcon: {
    backgroundColor: "purple",
    width: 10,
    height: 30,
  },

  itemBottomContainer: {
    position: "absolute",
    bottom: 20,
    paddingLeft: 20,
    paddingRight: 30,
    flexDirection: "row",
  },

  itemBottomTextContainer: {
    flexDirection: "column",
    paddingLeft: 6,
  },

  headerContainer: {
    marginTop: 50,
    marginBottom: 20,
    paddingHorizontal: 20,
  },

  headerTitle: {
    color: "#888",
    textTransform: "uppercase",
  },

  headerSubtitle: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "600",
  },
});
