import styles from "./styles";

import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  View,
} from "react-native";
import { apiSearchShows, apiShowsPage, Show } from "../../api/shows";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SerieCard from "./SerieCard";

export default function Home({ navigation }) {
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [showSearching, setShowSearching] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState("");
  const [shows, setShows] = useState<Array<Show>>([]);
  const [showsAtSearch, setShowsAtSearch] = useState<Array<Show>>([]);

  useEffect(() => {
    setLoading(true);
    _getLastShowsUpdate(page).then((data) => {
      setShows(data);
      setLoading(false);
    });
  }, [page]);

  useEffect(() => {
    if (searchValue.length >= 3) {
      setLoading(true);
      _searchShow(searchValue).then((data) => {
        setShowsAtSearch(data);
        setLoading(false);
      });
    }
  }, [searchValue]);

  const _searchShow = async (value: string): Promise<Array<Show>> => {
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

  const _getLastShowsUpdate = async (page: number): Promise<Array<Show>> => {
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
      <View style={styles.subHeaderContainer}>
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
      <View style={styles.searchContainer}>
        <TextInput
          onChangeText={setSearchValue}
          value={searchValue}
          style={styles.textInput}
        />
        <MaterialCommunityIcons
          name="close"
          size={28}
          color="#fff"
          style={styles.iconClose}
          onPress={() => {
            setShowSearching(false);
            setSearchValue("");
            setShowsAtSearch([]);
          }}
        />
      </View>
    </View>
  );

  const _renderContent = () => (
    <FlatList
      keyExtractor={(item) => `item_${item.id}`}
      data={searchValue.length > 0 ? showsAtSearch : shows}
      contentContainerStyle={styles.contentContainer}
      renderItem={({ item }) => (
        <SerieCard
          key={`serieCard_${item.id}`}
          navigation={navigation}
          show={item}
        />
      )}
      onEndReached={() => setPage(page + 1)}
      ListFooterComponent={() => (loading ? _renderLoading() : <></>)}
    />
  );

  const _renderLoading = () => <ActivityIndicator />;

  const _renderSearchRules = () => (
    <Text style={styles.textSearchRule}>
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
