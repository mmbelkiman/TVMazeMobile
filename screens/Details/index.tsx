import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import styles from "./styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { apiEpisodes, Episode, schedule, Show } from "../../api/shows";
import { removeHTMLTags } from "../../utils/string";
import {
  description,
  icon,
  image,
  title,
} from "../../sharedElements/HomeToDetails";
import EpisodeCard from "./EpisodeCard";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "../../store/actions";
import GenreContainer from "./GenreContainer";
import SeasonContainer from "./SeasonContainer";

const Details = ({ navigation, route }) => {
  const show: Show = route.params.show;
  const [episodes, setEpisodes] = useState<Array<Episode>>([]);
  const [seasons, setSeasons] = useState<any>([]);
  const [currentSeasonVisible, setCurrentSeasonVisible] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  const liked = useSelector((state) => {
    return state.tvMazeMobile.liked[show.name + "_" + show.id];
  });

  useEffect(() => {
    setLoading(true);
    apiEpisodes(show.id)
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
    setLoading(false);
  }, [episodes]);

  const _renderSchedule = (schedule: schedule, runtime: number = 0) => {
    const days = schedule.days.map((day, index) => day);
    const time = schedule.time !== undefined ? "at " + schedule.time : "";
    const minutes = runtime > 0 ? "(" + runtime + "min)" : "";

    return (
      <View style={{ paddingTop: 10 }}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          Schedule
        </Text>
        <Text
          style={styles.textDescription}
        >{`${days} ${time} ${minutes}`}</Text>
      </View>
    );
  };

  const _renderSeasons = (seasons) => (
    <View style={styles.containerSeason}>
      <Text style={styles.textSeasonTitle}>Seasons</Text>
      <View style={{ padding: 20 }}>
        <FlatList
          data={seasons}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ index }) =>
            index > 0 && (
              <SeasonContainer
                season={index}
                onPress={() => setCurrentSeasonVisible(index)}
              />
            )
          }
        />
      </View>
    </View>
  );

  const _renderEpisodes = (episodes: Array<Episode> = []) => (
    <View>
      {episodes.map((episode) => (
        <EpisodeCard
          key={`episode_${episode.id}`}
          episode={episode}
          navigation={navigation}
        />
      ))}
    </View>
  );

  const _renderGenres = (genres: []) => (
    <FlatList
      data={genres}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <GenreContainer genre={item} />}
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

  const _renderLoading = () => (
    <ActivityIndicator style={{ paddingBottom: 50 }} />
  );

  return (
    <View style={styles.container}>
      {_renderImage(
        show.id,
        show?.image?.original ||
          "https://media.comicbook.com/files/img/default-movie.png"
      )}

      <View style={styles.titleContainer}>
        {_renderIcon(show.id)}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {_renderTitle(show.id, show.name)}
          <MaterialCommunityIcons
            name={liked ? "heart" : "heart-outline"}
            size={28}
            color="#fff"
            onPress={() => {
              dispatch(toggleLike(show.name + "_" + show.id));
            }}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {_renderGenres(show.genres)}

        <Text style={styles.textDescription}>
          {removeHTMLTags(show.summary)}
        </Text>

        {_renderSchedule(show.schedule, show.averageRuntime)}

        {_renderSeasons(seasons)}

        {loading && _renderLoading()}

        {_renderEpisodes(seasons[currentSeasonVisible])}
      </ScrollView>
    </View>
  );
};

Details.sharedElements = (route) => {
  const show: Show = route.params.show;
  return [
    {
      id: image.id(show.id),
      animation: image.animation,
      resize: image.resize,
    },
    {
      id: title.id(show.id),
      animation: title.animation,
      resize: title.resize,
    },
    {
      id: description.id(show.id),
      animation: description.animation,
      resize: description.resize,
    },
    {
      id: icon.id(show.id),
      animation: icon.animation,
      resize: icon.resize,
    },
  ];
};

export default Details;
