import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import GitList from "./src/screens/GitList/GitList";
import UserProfile from "./src/screens/UserProfile/UserProfile";
import screenNames from "./src/common/screenNames";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#222222",
            },
            headerTitleStyle: {
              color: "#ffffff",
            },
          }}
        >
          <Stack.Screen
            name={screenNames.GitList}
            component={GitList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={screenNames.UserProfile}
            component={UserProfile}
            options={{ title: "Profile" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const Stack = createNativeStackNavigator();
