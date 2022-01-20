import styles from "./styles";

import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import PINCode, {
  hasUserSetPinCode,
  resetPinCodeInternalStates,
  deleteUserPinCode,
} from "@haskkor/react-native-pincode";

export default function Pincode({ navigation }) {
  const [showPinLock, setShowPinLock] = useState(false);
  const [status, setStatus] = useState<"choose" | "enter" | "locked">("enter");

  useEffect(() => {
    // console.log("TESTE");
    // deleteUserPinCode();
    // resetPinCodeInternalStates();
  }, []);

  useEffect(() => {
    hasUserSetPinCode()
      .then((hasPin) => {
        if (hasPin) {
          setStatus("enter");
        } else {
          setStatus("choose");
        }
      })
      .finally(() => {
        setTimeout(() => {
          setShowPinLock(true);
        }, 100);
      });
  }, []);

  const _finishProcess = async () => {
    setShowPinLock(false);
    navigation.reset({
      index: 0,
      routes: [{ name: "HomeScreen" }],
    });
  };

  return (
    <View style={styles.container}>
      {showPinLock && (
        <PINCode finishProcess={() => _finishProcess()} status={status} />
      )}
    </View>
  );
}
