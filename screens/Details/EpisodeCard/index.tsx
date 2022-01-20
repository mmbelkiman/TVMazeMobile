import { SharedElement } from "react-navigation-shared-element";
import { image as imageEpisode } from "../../../sharedElements/DetailsToEpisode";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import React from "react";
import { Episode } from "../../../api/shows";

interface Props {
  navigation: any;
  episode: Episode;
}

const EpisodeCard: React.FC<Props> = ({ navigation, episode }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("EpisodeDetailsScreen", { episode });
      }}
      style={styles.container}
    >
      <SharedElement id={imageEpisode.id(episode.id)}>
        <Image
          source={{
            uri:
              episode?.image?.medium ||
              "https://media.comicbook.com/files/img/default-movie.png",
          }}
          style={styles.imageEpisode}
          resizeMode="cover"
        />
      </SharedElement>
      <View style={{ flexDirection: "column", padding: 10, marginRight: 20 }}>
        <Text numberOfLines={1} style={styles.textEpisodeTitle}>
          {episode.name}
        </Text>
        <Text style={styles.textEpisodeTitle}>
          S{episode.season}E{episode.number}
        </Text>
        <Text style={styles.textEpisodeAirstamp}>
          {new Date(episode.airstamp).toDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default EpisodeCard;
