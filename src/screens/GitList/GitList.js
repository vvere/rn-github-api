import React, { useEffect, useReducer, useCallback } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

import apiUrl from "../../common/apiUrl";
import GitElement from "./GitElement";

const SET_LIST = "SET_LIST";
const SET_ERROR = "SET_ERROR";
const SET_LOADING = "SET_LOADING";
const SET_SEARCH = "SET_SEARCH";

const initState = {
  search: "v",
  list: [],
  error: false,
  loading: true,
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
          dispatch({
            type: SET_LIST,
            payload: [...userResponse.data.items, ...repoResponse.data.items],
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
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={list}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </View>
  );
};

export default GitList;

const styles = StyleSheet.create({
  container: { flex: 1 },
  mainContainer: { backgroundColor: "#000000" },
});
