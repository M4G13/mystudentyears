import React, { Component, useState, useEffect } from 'react';
import { Alert, StatusBar, StyleSheet, View, Text, Pressable, Image } from 'react-native';

StatusBar.setBarStyle('light-content');

export default class QuizScreen extends Component {
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
    }
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
    }
});
