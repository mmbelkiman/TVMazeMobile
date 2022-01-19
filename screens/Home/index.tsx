import LinearGradient from "react-native-linear-gradient";
import styles from "./styles";

import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { apiSearchShows, apiShowsPage, Show } from "../../api/shows";
import { icon, image, title } from "../../sharedElements/HomeToDetails";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Home({ navigation }) {
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [showSearching, setShowSearching] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState("");
  const [shows, setShows] = useState<Array<Show>>([]);
  const [showsAtSearch, setShowsAtSearch] = useState<Array<Show>>([]);

  useEffect(() => {
    setLoading(true);
    getLastShowsUpdate(page).then((data) => {
      setShows(data);
      setLoading(false);
    });
  }, [page]);

  useEffect(() => {
    if (searchValue.length >= 3) {
      setLoading(true);
      searchShow(searchValue).then((data) => {
        setShowsAtSearch(data);
        setLoading(false);
      });
    }
  }, [searchValue]);

  const searchShow = async (value: string): Promise<Array<Show>> => {
    return new Promise((resolve, reject) => {
      return apiSearchShows(value)
        .then(async (searchResult) => {
          const _shows: Array<Show> = [];

          searchResult.map((item) => {
            _shows.push(item.show);
          });

          return resolve(_shows);
        })
        .catch(() => {
          return reject([]);
        });
    });
  };

  const getLastShowsUpdate = async (page: number): Promise<Array<Show>> => {
    return new Promise((resolve, reject) => {
      return apiShowsPage(page)
        .then(async (showUpdate) => {
          const _allShows = shows.concat(showUpdate);
          return resolve(_allShows);
        })
        .catch(() => {
          return reject([]);
        });
    });
  };

  const _renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Series in focus</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.headerSubtitle}>Today</Text>
        <MaterialCommunityIcons
          name="movie-search-outline"
          size={28}
          color="#fff"
          style={{ alignSelf: "center" }}
          onPress={() => setShowSearching(true)}
        />
      </View>
    </View>
  );

  const _renderHeaderSearch = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Search</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: 10,
        }}
      >
        <TextInput
          onChangeText={setSearchValue}
          value={searchValue}
          style={{ width: "80%", backgroundColor: "#00000033", color: "white" }}
        />
        <MaterialCommunityIcons
          name="close"
          size={28}
          color="#fff"
          style={{ alignSelf: "center" }}
          onPress={() => {
            setShowSearching(false);
            setSearchValue("");
            setShowsAtSearch([]);
          }}
        />
      </View>
    </View>
  );

  const _renderItemIcon = (id: number) => (
    <SharedElement id={icon.id(id)}>
      <View style={styles.itemIcon} />
    </SharedElement>
  );

  const _renderImage = (id: number, imageUri: string) => (
    <SharedElement id={image.id(id)}>
      <Image
        style={styles.image}
        source={{ uri: imageUri }}
        resizeMode="cover"
      />
    </SharedElement>
  );

  const _renderItemTitle = (id: number, name: string) => (
    <SharedElement id={title.id(id)}>
      <Text style={styles.textItemTitle}>{name}</Text>
    </SharedElement>
  );

  const _renderItem = (item: Show) => (
    <TouchableOpacity
      key={item.id}
      activeOpacity={0.8}
      style={styles.itemContainer}
      onPress={() => navigation.navigate("DetailScreen", { item })}
    >
      {_renderImage(
        item.id,
        item?.image?.original ||
          "https://media.comicbook.com/files/img/default-movie.png"
      )}
      <LinearGradient
        colors={["#27204211", "#27204299", "#272042ee"]}
        style={{
          position: "absolute",
          bottom: 0,
          paddingLeft: 20,
          paddingRight: 30,
          paddingTop: 20,
          flexDirection: "row",
        }}
      >
        {_renderItemIcon(item.id)}
        <View style={styles.itemBottomTextContainer}>
          {_renderItemTitle(item.id, item.name)}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const _renderContent = () => (
    <FlatList
      keyExtractor={(item) => `item_${item.id}`}
      data={searchValue.length > 0 ? showsAtSearch : shows}
      contentContainerStyle={styles.contentContainer}
      renderItem={({ item }) => {
        return _renderItem(item);
      }}
      onEndReached={() => setPage(page + 1)}
      ListFooterComponent={() => (loading ? _renderLoading() : <></>)}
    />
  );

  const _renderLoading = () => <ActivityIndicator />;

  const _renderSearchRules = () => (
    <Text
      style={{ color: "white", textAlign: "center", padding: 10, margin: 10 }}
    >
      Type three letters or more to perform a search
    </Text>
  );

  return (
    <View style={styles.container}>
      {showSearching ? _renderHeaderSearch() : _renderHeader()}
      {searchValue.length > 0 && searchValue.length < 3 && _renderSearchRules()}
      {_renderContent()}
    </View>
  );
}
