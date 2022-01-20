import { SharedElement } from "react-navigation-shared-element";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import React from "react";
import { Show } from "../../../api/shows";
import LinearGradient from "react-native-linear-gradient";
import { icon, image, title } from "../../../sharedElements/HomeToDetails";

interface Props {
  navigation: any;
  show: Show;
}

const SerieCard: React.FC<Props> = ({ navigation, show }) => {
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

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.itemContainer}
      onPress={() => navigation.navigate("DetailScreen", { show })}
    >
      {_renderImage(
        show.id,
        show?.image?.original ||
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
        {_renderItemIcon(show.id)}
        <View style={styles.itemBottomTextContainer}>
          {_renderItemTitle(show.id, show.name)}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default SerieCard;
