import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import styles from "./styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { apiEpisodes, Episode, Show } from "../../api/shows";
import { removeHTMLTags } from "../../utils/string";
import {
  description,
  icon,
  image,
  title,
} from "../../sharedElements/HomeToDetails";

import { image as imageEpisode } from "../../sharedElements/DetailsToEpisode";

// MaterialCommunityIcons.loadFont();

const Details = ({ navigation, route }) => {
  const item: Show = route.params.item;
  const [episodes, setEpisodes] = useState<Array<Episode>>([]);

  const [seasons, setSeasons] = useState<any>([]);

  const [currentSeasonVisible, setCurrentSeasonVisible] = useState<number>(1);

  useEffect(() => {
    apiEpisodes(item.id)
      .then((data) => {
        setEpisodes(data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    let _seasons = [];
    episodes.map((episode) => {
      if (_seasons[episode.season] === undefined) {
        _seasons[episode.season] = [];
      }
      _seasons[episode.season].push(episode);
    });

    setSeasons(_seasons);
  }, [episodes]);

  const _renderSeasons = () => (
    <View style={{ paddingTop: 10 }}>
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
        Seasons
      </Text>
      <View style={{ padding: 20 }}>
        <FlatList
          data={seasons}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) =>
            index > 0 && (
              <TouchableOpacity
                onPress={() => setCurrentSeasonVisible(index)}
                style={{
                  marginHorizontal: 4,
                  backgroundColor: "#6c4cc5",
                  width: 50,
                  borderRadius: 25,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  {index}
                </Text>
              </TouchableOpacity>
            )
          }
        />
      </View>
    </View>
  );

  const _renderEpisodes = (episodes: Array<Show> = []) => (
    <View>
      {episodes.map((episode) => (
        <TouchableOpacity
          key={`episode_${episode.id}`}
          onPress={() => {
            navigation.navigate("EpisodeDetailsScreen", { episode });
          }}
          style={{
            backgroundColor: "#332e59",
            margin: 1,
            paddingHorizontal: 10,
            paddingVertical: 20,
            borderRadius: 10,
            flexDirection: "row",
          }}
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
          <View
            style={{ flexDirection: "column", padding: 10, marginRight: 20 }}
          >
            <Text numberOfLines={1} style={styles.textEpisodeTitle}>
              {episode.name}
            </Text>
            <Text style={styles.textEpisodeTitle}>
              S{episode.season}E{episode.number}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const _renderGenres = (genres: []) => (
    <FlatList
      data={genres}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View
          style={{
            marginHorizontal: 4,
            backgroundColor: "#8949aa",
            borderRadius: 25,
            padding: 4,
          }}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            {item}
          </Text>
        </View>
      )}
    />
  );

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

  const _renderIcon = (id: number) => (
    <SharedElement id={icon.id(id)}>
      <View style={styles.icon} />
    </SharedElement>
  );

  const _renderTitle = (id: number, name: string) => (
    <SharedElement id={title.id(id)}>
      <Text style={styles.name}>{name}</Text>
    </SharedElement>
  );

  return (
    <View style={styles.container}>
      {_renderImage(
        item.id,
        item?.image?.original ||
          "https://media.comicbook.com/files/img/default-movie.png"
      )}

      <View style={styles.titleContainer}>
        {_renderIcon(item.id)}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {_renderTitle(item.id, item.name)}
          <MaterialCommunityIcons
            name="heart-outline"
            size={28}
            color="#fff"
            onPress={() => {}}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {_renderGenres(item.genres)}

        <Text style={styles.textDescription}>
          {removeHTMLTags(item.summary)}
        </Text>

        {_renderSeasons()}

        {_renderEpisodes(seasons[currentSeasonVisible])}
      </ScrollView>
    </View>
  );
};

Details.sharedElements = (route) => {
  const { item } = route.params;
  return [
    {
      id: image.id(item.id),
      animation: image.animation,
      resize: image.resize,
    },
    {
      id: title.id(item.id),
      animation: title.animation,
      resize: title.resize,
    },
    {
      id: description.id(item.id),
      animation: description.animation,
      resize: description.resize,
    },
    {
      id: icon.id(item.id),
      animation: icon.animation,
      resize: icon.resize,
    },
  ];
};

export default Details;
