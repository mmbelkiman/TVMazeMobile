import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#332e59",
    margin: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    flexDirection: "row",
  },

  textEpisodeTitle: {
    fontSize: 18,
    color: "#fff",
    lineHeight: 24,
    marginBottom: 4,
    marginRight: 60,
  },

  textEpisodeAirstamp: {
    fontSize: 12,
    color: "#fff",
    lineHeight: 24,
    marginBottom: 4,
    marginRight: 60,
  },

  imageEpisode: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },

  name: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 28,
  },

  titleContainer: {
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  icon: {
    backgroundColor: "purple",
    width: 10,
    height: 30,
    marginRight: 5,
    borderRadius: 10,
  },
});
