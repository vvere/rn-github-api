import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const GitElement = ({ item }) => {
  const navigation = useNavigation();
  const onPress = () => {
    if (item.login) {
      navigation.navigate("UserProfile", { item });
    }
  };

  return (
    <Pressable style={styles.container} onPress={onPress}>
      {item.login ? (
        <Image style={styles.image} source={{ uri: item.avatar_url }} />
      ) : (
        <View style={styles.image}>
          <Text style={styles.text}>{item.name.charAt(0).toUpperCase()}</Text>
        </View>
      )}
      <Text style={styles.text}>
        {item.login ? item.login : item.full_name}
      </Text>
    </Pressable>
  );
};

export default GitElement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    borderBottomColor: "#222222",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  text: { color: "#ffffff" },
  image: {
    height: 50,
    width: 50,
    backgroundColor: "#222222",
    borderRadius: 25,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
