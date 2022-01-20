import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import React from "react";

interface Props {
  season: number;
  onPress(): void;
}

const SeasonContainer: React.FC<Props> = ({ season, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
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
        {season}
      </Text>
    </TouchableOpacity>
  );
};

export default SeasonContainer;
