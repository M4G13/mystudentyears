import React, {Component} from 'react';
import {Alert, StatusBar, StyleSheet, View, Text, Pressable, Image} from 'react-native';
import { NavigationContainer, useNavigation, Navigate } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

StatusBar.setBarStyle('light-content');

function correctAnswer() {
    return(
       Alert.alert("Correct") 
    )
}

function incorrectAnswer() {
    return(
       Alert.alert("Incorrect") 
    )
}

function HomeScreen() {
    const navigation = useNavigation();
    return(
        <View style={{ flex: 1, alignItems: "center", justifyContent: "space-evenly", backgroundColor: '#272522' }}>
            <Image source={require('./assets/msy-logo.png')} style={{width: 200, height:400, objectFit: 'contain'}}/>
            <Text style={styles.answerText}>Welcome to My Student Years</Text>
            <Pressable onPress={() => navigation.navigate("Categories")}>
            <Text style={styles.selectButton}>
            Go to Categories
            </Text>
            </Pressable>
        </View>
    )
}

function Categories() {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "space-evenly", backgroundColor: '#272522' }}>
      <Text style={styles.answerText}>Welcome to the Categories page</Text>
    
      <Pressable onPress={() => navigation.navigate("Finance")}>
        <Text style={styles.selectButton}>Finance</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Categories")}>
        <Text style={styles.selectButton}>
            Wellbeing
        </Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Categories")}>
        <Text style={styles.selectButton}>
            Academic Support
        </Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Categories")}>
        <Text style={styles.selectButton}>
            4th category(?)
        </Text>
      </Pressable>
    </View>
    );
}

function Finance() {
    const navigation = useNavigation();
    return(
        <View style={{ flex: 1, alignItems: "center", justifyContent: "space-evenly", backgroundColor: '#272522' }}>
            <Text style={styles.answerText}>This is the finance section</Text>
            <Text style={styles.questionText}>
            There will be a bunch of resources here.
            </Text>
            <Pressable onPress={() => navigation.navigate("Finance Quiz")}>
            <Text style={styles.selectButton}>
            Go to the quiz for this section
            </Text>
            </Pressable>
        </View>
    )
}

function FinanceQuiz()  {
    return(
            <View style={styles.container}>
                <View style={styles.questionContainer}>
                    <Image source={require('./assets/mirror.png')} style={{width: 100, height:200, objectFit: 'contain'}}/>
                    <Text style={styles.questionText}>Should you spend your entire student loan payment on alcohol?</Text>
                </View>
                <View style={styles.buttonRow}>
                    <Pressable onPress={correctAnswer} style={[styles.answerButton, {backgroundColor: '#dd8844'}]}>
                        <Text style={styles.answerText}>
                        Definitely.
                        </Text>
                    </Pressable>
                    <Pressable onPress={incorrectAnswer} style={[styles.answerButton, {backgroundColor: '#44dd88'}]}>
                        <Text style={styles.answerText}>
                        Probably?
                        </Text>
                    </Pressable>
                </View>
                <View style={styles.buttonRow}>
                    <Pressable onPress={incorrectAnswer} style={[styles.answerButton, {backgroundColor: '#dd4488'}]}>
                        <Text style={styles.answerText}>
                        Maybe?
                        </Text>
                    </Pressable>
                    <Pressable onPress={incorrectAnswer} style={[styles.answerButton, {backgroundColor: '#8844dd'}]}>
                        <Text style={styles.answerText}>
                        No?
                        </Text>
                    </Pressable>
                </View>
            </View>
        );
}

const Stack = createNativeStackNavigator();

export default function App() {
    return(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="My Student Years" component={HomeScreen} />
                    <Stack.Screen name="Categories" component={Categories} />
                    <Stack.Screen name="Finance" component={Finance} />
                    <Stack.Screen name="Finance Quiz" component={FinanceQuiz} />
                </Stack.Navigator>
            </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#272522',
    },

    questionContainer: {
        flex: 0,
        width: '100%',
        padding: 30,
        paddingBottom: 50,
        alignItems: 'center',
    },

    questionText: {
        textAlign: 'center',
        width: '100%',
        fontSize: 30,
        color: '#ffffff',
    },

    buttonRow: {
        margin: 30,
        marginTop: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        textTransform: 0,
    },
    
    answerButton: {
        backgroundColor: '#4488dd',
        padding: 15,
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius: 5,
        width: '45%',
    },

    answerText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 20,
        textAlign: 'center',
    },

    selectButton: {
        backgroundColor: '#05b4ff',
        padding: 15,
        paddingLeft: 25,
        paddingRight: 25,
        borderRadius: 5,
        width: '45%',
    },
});
