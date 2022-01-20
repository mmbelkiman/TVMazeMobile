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

  headerContainer: {
    marginTop: 50,
    marginBottom: 20,
    paddingHorizontal: 20,
  },

  subHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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

  textSearchRule: {
    color: "white",
    textAlign: "center",
    padding: 10,
    margin: 10,
  },

  textInput: {
    width: "80%",
    backgroundColor: "#00000033",
    color: "white",
  },

  iconClose: {
    alignSelf: "center",
  },

  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
});
