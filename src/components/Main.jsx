import { Text, View, FlatList } from "react-native";
import Constants from "expo-constants";
import React from "react";
import EmpleadoList from "./EmpleadoList";
import EmpleadoSubida from "./EmpleadoSubida";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="EmpleadoList">
        <Stack.Screen name="EmpleadoList" component={EmpleadoList} />
        <Stack.Screen name="EmpleadoSubida" component={EmpleadoSubida} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
