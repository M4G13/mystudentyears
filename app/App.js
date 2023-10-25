import React, { Component, useState, useEffect } from 'react';
import { Alert, StatusBar, StyleSheet, View, Text, Pressable, Image, ImageBackground } from 'react-native';
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
        <View style={{ flex: 1, backgroundColor: '#272522'}}>
            <ImageBackground source={require('./assets/temp_map.png')} resizeMode="cover" style = {styles.map}>
                <Text >Welcome to the Categories page</Text>
                <Text >START</Text>
                
                <Pressable onPress={() => navigation.navigate("Finance")} style={{width:'55%', position:'absolute', left:40, top:50}}>
                    <Text style={styles.selectButton}>Finance</Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate("Categories")} style={{width:'65%', position:'absolute', left:280, top:300 }}>
                    <Text style={styles.selectButton}>
                        Wellbeing
                    </Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate("Categories")} style={{width:'65%' ,position:'absolute', left:10, top:370 }}>
                    <Text style={styles.selectButton}>
                        Academic Support
                    </Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate("Categories")} style={{width:'66%', height:70, position:'absolute', left:260, top:550}}>
                    <Text style={styles.selectButton}>
                        4th category(?)
                    </Text>
                </Pressable>
            </ImageBackground>
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

/*export default class QuizScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            information: null, 
        };
    }

    async componentDidMount() {
        try {
            const response = await fetch('http://localhost:1337/api/information-pages/1'); // Change all localhost's  with ip 
            const data = await response.json();

            if (response.status === 200 && data.data && data.data.attributes) {
                this.setState({ information: data.data.attributes });
            } else {
                console.error('Error fetching data:', data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    _wrongButton() {
        Alert.alert('Wrong ❌');
    }
    _correctButton() {
        Alert.alert('Correct ✅');
    }

    render() {
        const { information } = this.state;

        return (
            <View style={styles.container}>
                {information && (
                    <View style={styles.questionContainer}>
                        <Image source={require('./assets/mirror.png')} style={{ width: 100, height: 200, objectFit: 'contain' }} />
                        <Text style= {styles.questionText}>Mirror, mirror on the wall-who is the fairest of them all?</Text>
                        <Text style={styles.questionText}>{information.Title}</Text>
                        <Text style={styles.questionText}>{information.content}</Text>
                        <Image source={{ uri: 'http://localhost:1337/uploads/Wallet_689b92f573.jpg' }} style={{ width: 100, height: 100}} />  
                        

                    </View>
                )}
                <View style={styles.buttonRow}>
                    <Pressable onPress={this._wrongButton} style={[styles.answerButton, { backgroundColor: '#dd8844' }]}>
                        <Text style={styles.answerText}>Snow White</Text>
                    </Pressable>
                    <Pressable onPress={this._wrongButton} style={[styles.answerButton, { backgroundColor: '#44dd88' }]}>
                        <Text style={styles.answerText}>Evil Queen</Text>
                    </Pressable>
                </View>
                <View style={styles.buttonRow}>
                    <Pressable onPress={this._correctButton} style={[styles.answerButton, { backgroundColor: '#dd4488' }]}>
                        <Text style={styles.answerText}>Dopey</Text>
                    </Pressable>
                    <Pressable onPress={this._wrongButton} style={[styles.answerButton, { backgroundColor: '#8844dd' }]}>
                        <Text style={styles.answerText}>Huntsman</Text>
                    </Pressable>
                </View>
            </View>
        );
}*/

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

    map: {
        flex: 1,
    },

    Location: {
        backgroundColor: '#05b4ff',
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
});
