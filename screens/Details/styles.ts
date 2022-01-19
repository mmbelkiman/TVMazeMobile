import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },

  textGenres: {
    fontSize: 18,
    color: "#fff",
    lineHeight: 24,
    marginBottom: 4,
    backgroundColor: "red",
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },

  textEpisodeTitle: {
    fontSize: 18,
    color: "#fff",
    lineHeight: 24,
    marginBottom: 4,
    marginRight: 60,
  },

  scrollView: {
    paddingHorizontal: 20,
    backgroundColor: "#0f0f0f",
  },
  image: {
    height: 300,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  imageEpisode: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  textDescription: {
    fontSize: 16,
    color: "#fff",
    marginVertical: 10,
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
