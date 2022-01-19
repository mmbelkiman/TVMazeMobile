import React from "react";
import { Image, ImageBackground, ScrollView, Text, View } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import styles from "./styles";
import { Episode } from "../../api/shows";
import { image } from "../../sharedElements/DetailsToEpisode";
import { removeHTMLTags } from "../../utils/string";

const EpisodeDetails = ({ navigation, route }) => {
  const item: Episode = route.params.episode;

  const _renderImage = (id: number, imageURI: string) => (
    <ImageBackground
      source={{ uri: imageURI }}
      style={{ backgroundColor: "#272042" }}
      imageStyle={{ opacity: 0.5 }}
      resizeMode="cover"
    >
      <SharedElement id={image.id(id)}>
        <Image
          source={{ uri: imageURI }}
          style={styles.image}
          resizeMode="contain"
        />
      </SharedElement>
    </ImageBackground>
  );

  const _renderTitle = (id: number, name: string) => (
    <Text style={styles.name}>{name}</Text>
  );

  return (
    <View style={styles.container}>
      {_renderImage(
        item.id,
        item?.image?.original ||
          "https://media.comicbook.com/files/img/default-movie.png"
      )}

      <View style={styles.titleContainer}>
        {_renderTitle(item.id, item.name)}
      </View>

      <ScrollView style={styles.scrollView}>
        <Text style={{ color: "white" }}>Season {item.season}</Text>
        <Text style={{ color: "white" }}>Episode {item.number}</Text>
        <Text style={{ fontSize: 16, color: "#fff", marginVertical: 10 }}>
          {removeHTMLTags(item.summary)}
        </Text>
      </ScrollView>
    </View>
  );
};

EpisodeDetails.sharedElements = (route) => {
  const item: Episode = route.params.episode;
  return [
    {
      id: image.id(item.id),
      animation: image.animation,
      resize: image.resize,
    },
  ];
};

export default EpisodeDetails;
