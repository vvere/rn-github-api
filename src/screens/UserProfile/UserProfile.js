import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const UserProfile = () => {
  const {
    params: { item },
  } = useRoute();
  const { width } = useWindowDimensions();
  const size = width * 0.4 > 25 ? width * 0.4 : 25;

  return (
    <View style={[styles.container, styles.mainContainer]}>
      <View style={[styles.container, styles.upperContainer]}>
        <Image
          style={[
            styles.image,
            {
              height: size,
              width: size,
              borderRadius: size,
            },
          ]}
          source={{ uri: item.avatar_url }}
        />
      </View>
      <View style={[styles.container, styles.lowerContaienr]}>
        <Text style={styles.text}>{item.login}</Text>
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: { flex: 1 },
  mainContainer: { backgroundColor: "#000000" },
  image: {
    backgroundColor: "#222222",
  },
  text: { color: "#ffffff", fontSize: 32 },
  upperContainer: { justifyContent: "center", alignItems: "center" },
  lowerContaienr: { alignItems: "center" },
});
