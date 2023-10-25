import React, { Component, useState, useEffect } from 'react';
import { Alert, StatusBar, StyleSheet, View, Text, Pressable, Image } from 'react-native';
import { NavigationContainer, useNavigation, Navigate } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen.js";
import Categories from "./screens/Categories.js";
import Category from "./screens/Category.js";
import Question from "./screens/Question.js"

const Stack = createNativeStackNavigator();

export default function App() {
    return(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home Screen" component={HomeScreen} />
                    <Stack.Screen name="Categories" component={Categories} />
                    <Stack.Screen name="Category" component={Category} />
                    <Stack.Screen name="Question" component={Question} />
                </Stack.Navigator>
            </NavigationContainer>
    );
}
