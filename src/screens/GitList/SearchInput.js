import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchInput = ({ setSearchValue, search }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.icon]}>
        <Ionicons name="md-search" size={22} color="#ffffff" />
      </View>
      <TextInput
        autoFocus
        style={styles.textInput}
        placeholder="Search Value"
        placeholderTextColor="#ffffff"
        value={search}
        onChangeText={setSearchValue}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: { padding: 16, flexDirection: "row" },
  textInput: {
    backgroundColor: "#444",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    paddingHorizontal: 12,
    height: 44,
    flex: 1,
    color: "#ffffff",
  },
  icon: {
    height: 44,
    paddingLeft: 12,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: "#444",
    alignItems: "center",
    justifyContent: "center",
  },
});
