import { Text, View } from "react-native";
import styles from "./styles";
import React from "react";

interface Props {
  genre: string;
}

const GenreContainer: React.FC<Props> = ({ genre }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{genre}</Text>
    </View>
  );
};

export default GenreContainer;
