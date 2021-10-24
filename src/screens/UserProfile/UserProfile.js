import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import apiUrl from "../../common/apiUrl";

const UserProfile = () => {
  const [followers, setFollowers] = useState(-1);
  const {
    params: { item },
  } = useRoute();
  const { width } = useWindowDimensions();
  const size = width * 0.4 > 25 ? width * 0.4 : 25;

  const getFollowers = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}users/${item.login}`);

      setFollowers(response.data.followers);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }, []);

  useEffect(() => {
    getFollowers();
  }, [getFollowers]);

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
        {followers !== -1 && (
          <Text style={styles.smallerText}>followers: {followers}</Text>
        )}
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
  smallerText: { color: "#fafafa", fontSize: 22 },
  upperContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 32,
  },
  lowerContaienr: { alignItems: "center" },
});
