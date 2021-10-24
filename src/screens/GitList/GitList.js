import React, { useEffect, useReducer, useCallback } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

import apiUrl from "../../common/apiUrl";

const SET_LIST = "SET_LIST";
const SET_ERROR = "SET_ERROR";
const SET_LOADING = "SET_LOADING";
const SET_SEARCH = "SET_SEARCH";

const initState = {
  search: "",
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

  console.log(list.length);

  return (
    <View style={[styles.container, styles.mainContainer]}>
      <SafeAreaView style={[styles.container, styles.iosAreaContainer]}>
        <FlatList />
      </SafeAreaView>
    </View>
  );
};

export default GitList;

const styles = StyleSheet.create({
  container: { flex: 1 },
  mainContainer: { backgroundColor: "#232323" },
  iosAreaContainer: { justifyContent: "center", alignItems: "center" },
});
