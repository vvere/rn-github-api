import React, { useEffect, useReducer, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

import apiUrl from "../../common/apiUrl";
import GitElement from "./GitElement";
import SearchInput from "./SearchInput";

const SET_LIST = "SET_LIST";
const SET_ERROR = "SET_ERROR";
const SET_LOADING = "SET_LOADING";
const SET_SEARCH = "SET_SEARCH";

const initState = {
  search: "",
  list: [],
  error: false,
  loading: false,
  hasMore: false,
  page: 1,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case SET_LIST:
      return {
        ...state,
        list: payload,
        error: false,
      };
    case SET_ERROR:
      return { ...state, error: payload };
    case SET_LOADING:
      return { ...state, loading: payload };
    case SET_SEARCH:
      return { ...state, search: payload };
    default:
      throw new Error();
  }
};

const GitList = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const { search, list, error, loading, hasMore } = state;

  const setSearchValue = (value) => {
    dispatch({ type: SET_SEARCH, payload: value });
  };

  const getList = useCallback(async () => {
    let didCancel = false;
    if (search.trim() !== "") {
      try {
        dispatch({ type: SET_LOADING, payload: true });
        const [userResponse, repoResponse] = await Promise.all([
          axios.get(`${apiUrl}search/users`, {
            params: { q: search, order: "asc" },
          }),
          axios.get(`${apiUrl}search/repositories`, {
            params: { q: search, order: "asc" },
          }),
        ]);
        if (!didCancel) {
          const sortArrays = [
            ...userResponse.data.items,
            ...repoResponse.data.items,
          ].sort((a, b) => a.id - b.id);
          dispatch({
            type: SET_LIST,
            payload: sortArrays,
          });
        }
      } catch (error) {
        dispatch({ type: SET_ERROR, payload: true });
      } finally {
        if (!didCancel) dispatch({ type: SET_LOADING, payload: false });
      }
    }

    return () => {
      didCancel = true;
    };
  }, [search]);

  useEffect(() => {
    getList();
  }, [getList]);

  const keyExtractor = (item) => {
    if (item.login) return item.login;
    return item.id.toString();
  };

  const renderItem = useCallback(({ item }) => <GitElement item={item} />, []);
  return (
    <View style={[styles.container, styles.mainContainer]}>
      <SafeAreaView style={styles.container}>
        <SearchInput setSearchValue={setSearchValue} search={search} />
        {loading && (
          <View style={[styles.container, styles.loadingContainer]}>
            <ActivityIndicator size="large" color="#5252ff" />
          </View>
        )}
        {!loading &&
          (list.length > 0 ? (
            <FlatList
              contentContainerStyle={{ flexGrow: 1 }}
              data={list}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
            />
          ) : (
            <View style={[styles.container, styles.loadingContainer]}>
              <Text style={styles.text}>List is empty</Text>
            </View>
          ))}
      </SafeAreaView>
    </View>
  );
};

export default GitList;

const styles = StyleSheet.create({
  container: { flex: 1 },
  mainContainer: { backgroundColor: "#000000" },
  loadingContainer: { marginTop: 64 },
  text: { color: "#ffffff", textAlign: "center", fontSize: 24 },
});
